import Ably from "ably/promises";
import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';

// export const GET = async (req, res) => {

//  // Your application should perform some type of user 
//  // authorization to validate that the user is allowed 
//  // to receive a token before fulfilling the token request 
//  // if (requesting_user.isAuthenticated) {

//     //const clientId = req.query.clientId; //Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
//     //console.log(req.query)
//     //Client ID should come from the server
//     const shortName = uniqueNamesGenerator({
//       dictionaries: [colors, adjectives, animals]
//     });

//     const client = Ably.Rest.Promise(import.meta.env.VITE_ABLY_API_KEY);
//     const tokenRequestData = await client.auth.createTokenRequest({
//       clientId: shortName,
//     });
//     console.log(`Request: ${JSON.stringify(tokenRequestData)}`);
//     return res.json(tokenRequestData);

//   //} else {
//  // res.status(401).json({ 'error':'User is not authorized' })
//   //}
// };


//import Ably from "ably/promises";

// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
const handler = async (event) => {
  try {

    const shortName = uniqueNamesGenerator({
      dictionaries: [colors, adjectives, animals]
    });

    const client = new Ably.Rest.Promise(process.env.VITE_ABLY_API_KEY);
    const tokenRequestData = await client.auth.createTokenRequest({
      clientId: shortName,
    });
    console.log(`Request: ${JSON.stringify(tokenRequestData)}`);

    return {
      statusCode: 200,
      body: JSON.stringify(tokenRequestData),
      // // more keys you can return:
      headers: { "Content-Type": "application/json" },
      // isBase64Encoded: true,
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
