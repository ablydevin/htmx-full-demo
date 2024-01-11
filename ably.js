/*
Ably Extension
============================
This extension adds support for Ably to htmx.  
*/

(function () {
  let api;

  htmx.defineExtension("ably", {
    init: function (apiRef) {
      api = apiRef;
    },

    onEvent: function (name, evt) {
      switch (name) {
        case "htmx:beforeProcessNode":
          let parent = evt.target;

          queryAttributeOnThisOrChildren(parent, "ably-connect").forEach(child => {
            ensureAblyClientExists(child);
          });

          queryAttributeOnThisOrChildren(parent, "ably-subscribe").forEach(child => {
						ensureAblyChannelSubscription(child)
					});

          queryAttributeOnThisOrChildren(parent, "ably-publish").forEach(child => {
						ensureAblyChannelPublish(child)
					});
      }
    },
  });

  function queryAttributeOnThisOrChildren(element, attributeName) {
    var result = [];
    if (api.hasAttribute(element, attributeName)) {
      result.push(element);
    }
    element.querySelectorAll(`[${attributeName}], [data-${attributeName}], [data-hx-ably], [hx-ably]`)
      .forEach(function (node) {
      result.push(node);
    });
    return result;
  }

  function ensureAblyClientExists(element) {
    
    if (!api.bodyContains(element)) {
      console.log(`Parent element no longer exists. Abort.`);
      //Check for an if needed clean up any existing Ably connections
      return;
    }
  
    var token = api.getAttributeValue(element, "ably-token");
    var authUrl = api.getAttributeValue(element, "ably-authUrl");
    var clientId = api.getAttributeValue(element, "ably-clientId");
    var authMethod = api.getAttributeValue(element, "ably-authMethod");

    if (clientId) { 
      authUrl = `${authUrl}?clientId=${clientId}`; 
    }
  
    const clientOptions = Object.assign(
      {},
      token === null ? null : { token },
      authUrl === null ? null : { authUrl },
      authMethod === null ? null : { authMethod },
      clientId === null ? null : { clientId }
    );
    clientOptions.autoConnect = false;
  
    var wrapper = createAblyClientWrapper(element, function () {
      console.log(`Creating new Ably client instance with options ${JSON.stringify(clientOptions)}`)
      return Ably.Realtime.Promise(clientOptions);
    });

    // Put the Ably Client into the HTML Element's custom data.
    api.getInternalData(element).ablyClientWrapper = wrapper;

    const ablyWrapper = wrapper.publicInterface;
    ablyWrapper.connect();    
  }
  
  function ensureAblyChannelSubscription(subscribeElement) {
    var ablyClientElement = api.getClosestMatch(subscribeElement, hasAblyClient)
    processAblyClientSubscription(ablyClientElement,subscribeElement)
  }

  function ensureAblyChannelPublish(publishElement) {
		var ablyClientElement = api.getClosestMatch(publishElement, hasAblyClient)
		processAblyClientPublish(ablyClientElement, publishElement);
	}

  function createAblyClientWrapper(element, create) {

    var wrapper = {
      internalClient: null,
      messageQueue: [],
  
      sendImmediately: function (publishMessage, publishElement) {
        if (!this.internalClient) {
          api.triggerErrorEvent();
        }
  
        if (publishElement && api.triggerEvent(publishElement, "htmx:ablyBeforeSend", { message: publishMessage, ablyClientWrapper: this.publicInterface })) {
          var channelname = api.getAttributeValue(publishElement, "ably-channel");
          var channel = this.internalClient.channels.get(channelname);

          //Figure out how to let end users supply a topic
          var publishEvent = api.getAttributeValue(publishElement, "ably-event");
          channel.publish(publishEvent, publishMessage);
          
          publishElement && api.triggerEvent(publishElement, "htmx:ablyAfterSend", { message: publishMessage, ablyClientWrapper: this.publicInterface });
        }
      },
  
      send: function (message, publishElement) {
        //make sure the ably client state is correct
        if (this.internalClient.connection.state !== "connected") {
          this.messageQueue.push({ message: message, publishElement: publishElement });
        } else {
          this.sendImmediately(message, publishElement);
        }
      },
  
      handleQueuedMessages: function () {
        while (this.messageQueue.length > 0) {
          var queuedItem = this.messageQueue[0];
          if (this.socket.readyState === this.socket.OPEN) {
            this.sendImmediately(queuedItem.message, queuedItem.publishElement);
            this.messageQueue.shift();
          } else {
            break;
          }
        }
      },

      processMessage: function(message, subscribeElement) {
        
        var response = JSON.stringify(message);
        if (!api.triggerEvent(subscribeElement, "htmx:ablyBeforeMessage", { message: message, ablyClientWrapper: this.publicInterface })) {
            return;
        }
    
        api.withExtensions(subscribeElement, function (extension) {
          response = extension.transformResponse(response, null, subscribeElement);
        });
    
        var settleInfo = api.makeSettleInfo(subscribeElement);
        var fragment = api.makeFragment(response);

        if (fragment.children.length) {
          var children = Array.from(fragment.children);
          for (var i = 0; i < children.length; i++) {
            api.oobSwap(api.getAttributeValue(children[i], "hx-swap-oob") || "true", children[i], settleInfo);
          }
        }

        api.settleImmediately(settleInfo.tasks);
        api.triggerEvent(subscribeElement, "htmx:ablyAfterMessage", { message: response, ablyClientWrapper: this.publicInterface })
      },
  
      init: function () {
        var client = create();
  
        client.connection.on("connected", (stateChange) => {
          api.triggerEvent(element, "htmx:ablyConnecting", {
            event: { type: "connecting" },
          });
        });
  
        client.connection.on("connected", (stateChange) => {
          api.triggerEvent(element, "htmx:ablyConnected", {
            event: stateChange,
            ablyClientWrapper: wrapper.publicInterface,
          });
        });
  
        client.connection.on("disconnected", (stateChange) => {
          api.triggerEvent(element, "htmx:ablyDisconnected", {
            event: stateChange,
            ablyClientWrapper: wrapper.publicInterface,
          });
        });
  
        client.connection.on("suspended", (stateChange) => {
          api.triggerEvent(element, "htmx:ablySuspended", {
            event: stateChange,
            ablyClientWrapper: wrapper.publicInterface,
          });
        });
  
        client.connection.on("closed", (stateChange) => {
          api.triggerEvent(element, "htmx:ablyClosed", {
            event: stateChange,
            ablyClientWrapper: wrapper.publicInterface,
          });
        });
  
        client.connection.on("failed", (stateChange) => {
          api.triggerErrorEvent(element, "htmx:ablyFailed", {
            error: stateChange,
            ablyClientWrapper: wrapper,
          });
          //maybeCloseAblyClientSource(clientElt);
        });
  
        this.internalClient = client;
      },
  
      connect: function () {
        // The Ably client gracefully handles
        // scenarios where the client is already connected
        this.internalClient.connect();
      },

      close: function () {
        this.internalClient.close();
      },

      getChannel: function(channelname) {
        return this.internalClient.channels.get(channelname);
      }
    };
  
    wrapper.init();
  
    wrapper.publicInterface = {
      connect: wrapper.connect.bind(wrapper),
      close: wrapper.close.bind(wrapper),
      getChannel: wrapper.getChannel.bind(wrapper),
      processMessage: wrapper.processMessage.bind(wrapper),
      send: wrapper.send.bind(wrapper),
      sendImmediately: wrapper.sendImmediately.bind(wrapper),
      queue: wrapper.messageQueue,
    };
  
    return wrapper;
  }
  
  function hasAblyClient(element) {
		var result = api.getInternalData(element).ablyClientWrapper != null;
    return result;
	}

  function processAblyClientPublish(ablyClientElement, publishElement) {
		var nodeData = api.getInternalData(publishElement);
		var triggerSpecs = api.getTriggerSpecs(publishElement);
		triggerSpecs.forEach(function (triggerSpec) {
			api.addTriggerHandler(publishElement, triggerSpec, nodeData, function (elt, evt) {
				var ablyClientWrapper = api.getInternalData(ablyClientElement).ablyClientWrapper;
				var headers = api.getHeaders(publishElement, api.getTarget(publishElement));
				var results = api.getInputValues(publishElement, 'post');
        
				var errors = results.errors;
				var rawParameters = results.values;
				var expressionVars = api.getExpressionVars(publishElement);
				var allParameters = api.mergeObjects(rawParameters, expressionVars);
				var filteredParameters = api.filterValues(allParameters, publishElement);
				
				var sendConfig = {
				 	parameters: filteredParameters,
				 	unfilteredParameters: allParameters,
				 	headers: headers,
				 	errors: errors,

				 	triggeringEvent: evt,
					messageBody: undefined,
					ablyClientWrapper: ablyClientWrapper.publicInterface
				};

				if (!api.triggerEvent(elt, 'htmx:ablyConfigureSend', sendConfig)) {
					return;
				}

				if (errors && errors.length > 0) {
					api.triggerEvent(elt, 'htmx:validation:halted', errors);
					return;
				}

				var body = sendConfig.messageBody;
				if (body === undefined) {
					var toSend = Object.assign({}, sendConfig.parameters);
					if (sendConfig.headers)
						toSend['HEADERS'] = headers;
					body = JSON.stringify(toSend);
				}

				ablyClientWrapper.send(body, elt);

				if (api.shouldCancel(evt, elt)) {
					evt.preventDefault();
				}
			});
		});
	}

  function processAblyClientSubscription(ablyClientElement, subscribeElement) {
    
    var ablyClientWrapper = api.getInternalData(ablyClientElement).ablyClientWrapper;

    var channelname = api.getAttributeValue(subscribeElement, "ably-channel")
    var channel = ablyClientWrapper.publicInterface.getChannel(channelname)
    var channelevent = api.getAttributeValue(subscribeElement, "ably-event")

		api.triggerEvent(subscribeElement, "htmx:ablyBeforeChannelSubscribe", { channel_name: channelname, channel_event: channelevent, ablyClientWrapper: ablyClientWrapper.publicInterface });

    if (channelevent)
      channel.subscribe(channelevent, (message)=>{ ablyClientWrapper.processMessage(message, subscribeElement) });
    else 
      channel.subscribe((message)=>{ ablyClientWrapper.processMessage(message, subscribeElement) });

		api.triggerEvent(subscribeElement, "htmx:ablyAfterChannelSubscribe", { channel_name: channelname, ablyClientWrapper: ablyClientWrapper.publicInterface });
	}
})();