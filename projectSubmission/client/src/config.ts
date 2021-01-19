// TODO: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = 'yezx4ebns0'
export const apiEndpoint = `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev`

export const authConfig = {
  // TODO: Create an Auth0 application and copy values from it into this map
  domain: 'dev--0p77835.us.auth0.com',            // Auth0 domain
  clientId: 'tRsf51p5tsLtsJcDgs4Y2OrL0O5leAFZ',          // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'
}
