import Ably from "ably";
import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';

export const GET = async (req, res) => {

 // Your application should perform some type of user 
 // authorization to validate that the user is allowed 
 // to receive a token before fulfilling the token request 
 // if (requesting_user.isAuthenticated) {

    //const clientId = req.query.clientId; //Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    //console.log(req.query)
    //Client ID should come from the server
    const shortName = uniqueNamesGenerator({
      dictionaries: [colors, adjectives, animals]
    });

    const client = Ably.Rest.Promise(import.meta.env.VITE_ABLY_API_KEY);
    const tokenRequestData = await client.auth.createTokenRequest({
      clientId: shortName,
    });
    console.log(`Request: ${JSON.stringify(tokenRequestData)}`);
    return res.json(tokenRequestData);

  //} else {
 // res.status(401).json({ 'error':'User is not authorized' })
  //}
};