(function(){const u=document.createElement("link").relList;if(u&&u.supports&&u.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))y(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const p of o.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&y(p)}).observe(document,{childList:!0,subtree:!0});function v(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function y(s){if(s.ep)return;s.ep=!0;const o=v(s);fetch(s.href,o)}})();(function(){let e;htmx.defineExtension("ably",{init:function(r){e=r},onEvent:function(r,i){switch(r){case"htmx:beforeProcessNode":let t=i.target;u(t,"ably-connect").forEach(n=>{v(n)}),u(t,"ably-subscribe").forEach(n=>{y(n)}),u(t,"ably-publish").forEach(n=>{s(n)})}}});function u(r,i){var t=[];return e.hasAttribute(r,i)&&t.push(r),r.querySelectorAll(`[${i}], [data-${i}], [data-hx-ably], [hx-ably]`).forEach(function(n){t.push(n)}),t}function v(r){if(!e.bodyContains(r)){console.log("Parent element no longer exists. Abort.");return}var i=e.getAttributeValue(r,"ably-token"),t=e.getAttributeValue(r,"ably-authUrl"),n=e.getAttributeValue(r,"ably-clientId"),a=e.getAttributeValue(r,"ably-authMethod");n&&(t=`${t}?clientId=${n}`),clientOptions=Object.assign({},i===null?null:{token:i},t===null?null:{authUrl:t},a===null?null:{authMethod:a},n===null?null:{clientId:n}),clientOptions.autoConnect=!1;var l=o(r,function(){return console.log(`Creating new Ably client instance with options ${JSON.stringify(clientOptions)}`),Ably.Realtime.Promise(clientOptions)});e.getInternalData(r).ablyClientWrapper=l,ablyWrapper=l.publicInterface,ablyWrapper.connect()}function y(r){var i=e.getClosestMatch(r,p);x(i,r)}function s(r){var i=e.getClosestMatch(r,p);A(i,r)}function o(r,i){var t={internalClient:null,messageQueue:[],sendImmediately:function(n,a){if(this.internalClient||e.triggerErrorEvent(),a&&e.triggerEvent(a,"htmx:ablyBeforeSend",{message:n,ablyClientWrapper:this.publicInterface})){var l=e.getAttributeValue(a,"ably-channel"),c=this.internalClient.channels.get(l),g=e.getAttributeValue(a,"ably-event");c.publish(g,n),a&&e.triggerEvent(a,"htmx:ablyAfterSend",{message:n,ablyClientWrapper:this.publicInterface})}},send:function(n,a){this.internalClient.connection.state!=="connected"?this.messageQueue.push({message:n,publishElement:a}):this.sendImmediately(n,a)},handleQueuedMessages:function(){for(;this.messageQueue.length>0;){var n=this.messageQueue[0];if(this.socket.readyState===this.socket.OPEN)this.sendImmediately(n.message,n.publishElement),this.messageQueue.shift();else break}},processMessage:function(n,a){var l=JSON.stringify(n);if(e.triggerEvent(a,"htmx:ablyBeforeMessage",{message:n,ablyClientWrapper:this.publicInterface})){e.withExtensions(a,function(h){l=h.transformResponse(l,null,a)});var c=e.makeSettleInfo(a),g=e.makeFragment(l);if(g.children.length)for(var d=Array.from(g.children),f=0;f<d.length;f++)e.oobSwap(e.getAttributeValue(d[f],"hx-swap-oob")||"true",d[f],c);e.settleImmediately(c.tasks),e.triggerEvent(a,"htmx:ablyAfterMessage",{message:l,ablyClientWrapper:this.publicInterface})}},init:function(){var n=i();n.connection.on("connected",a=>{e.triggerEvent(r,"htmx:ablyConnecting",{event:{type:"connecting"}})}),n.connection.on("connected",a=>{e.triggerEvent(r,"htmx:ablyConnected",{event:a,ablyClientWrapper:t.publicInterface})}),n.connection.on("disconnected",a=>{e.triggerEvent(r,"htmx:ablyDisconnected",{event:a,ablyClientWrapper:t.publicInterface})}),n.connection.on("suspended",a=>{e.triggerEvent(r,"htmx:ablySuspended",{event:a,ablyClientWrapper:t.publicInterface})}),n.connection.on("closed",a=>{e.triggerEvent(r,"htmx:ablyClosed",{event:a,ablyClientWrapper:t.publicInterface})}),n.connection.on("failed",a=>{e.triggerErrorEvent(r,"htmx:ablyFailed",{error:a,ablyClientWrapper:t})}),this.internalClient=n},connect:function(){this.internalClient.connect()},close:function(){this.internalClient.close()},getChannel:function(n){return this.internalClient.channels.get(n)}};return t.init(),t.publicInterface={connect:t.connect.bind(t),close:t.close.bind(t),getChannel:t.getChannel.bind(t),processMessage:t.processMessage.bind(t),send:t.send.bind(t),sendImmediately:t.sendImmediately.bind(t),queue:t.messageQueue},t}function p(r){var i=e.getInternalData(r).ablyClientWrapper!=null;return i}function A(r,i){var t=e.getInternalData(i),n=e.getTriggerSpecs(i);n.forEach(function(a){e.addTriggerHandler(i,a,t,function(l,c){var g=e.getInternalData(r).ablyClientWrapper,d=e.getHeaders(i,e.getTarget(i)),f=e.getInputValues(i,"post"),h=f.errors,W=f.values,O=e.getExpressionVars(i),m=e.mergeObjects(W,O),S=e.filterValues(m,i),b={parameters:S,unfilteredParameters:m,headers:d,errors:h,triggeringEvent:c,messageBody:void 0,ablyClientWrapper:g.publicInterface};if(e.triggerEvent(l,"htmx:ablyConfigureSend",b)){if(h&&h.length>0){e.triggerEvent(l,"htmx:validation:halted",h);return}var C=b.messageBody;if(C===void 0){var I=Object.assign({},b.parameters);b.headers&&(I.HEADERS=d),C=JSON.stringify(I)}g.send(C,l),e.shouldCancel(c,l)&&c.preventDefault()}})})}function x(r,i){var t=e.getInternalData(r).ablyClientWrapper,n=e.getAttributeValue(i,"ably-channel"),a=t.publicInterface.getChannel(n),l=e.getAttributeValue(i,"ably-event");e.triggerEvent(i,"htmx:ablyBeforeChannelSubscribe",{channel_name:n,channel_event:l,ablyClientWrapper:t.publicInterface}),l?a.subscribe(l,c=>{t.processMessage(c,i)}):a.subscribe(c=>{t.processMessage(c,i)}),e.triggerEvent(i,"htmx:ablyAfterChannelSubscribe",{channel_name:n,ablyClientWrapper:t.publicInterface})}})();