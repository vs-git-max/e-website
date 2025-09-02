import checkoutNodeJssdk from "@paypal/paypal-server-sdk";

const environment = () => {
  let clientId = process.env.PAYPAL_CLIENT_ID;
  let clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  return new checkoutNodeJssdk.core.SandboxEnvironment(clientId, clientSecret);
};

const client = () => {
  return new checkoutNodeJssdk.core.PayPalHttpClient(environment());
};

export default client;
