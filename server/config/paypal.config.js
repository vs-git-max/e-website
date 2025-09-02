import paypal from "@paypal/checkout-server-sdk";

function environment() {
  let clientId = process.env.PAYPAL_CLIENT_ID;
  let clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  return new paypal.core.SandboxEnvironment(clientId, clientSecret);
  // Use paypal.core.LiveEnvironment for production
}

function client() {
  return new paypal.core.PayPalHttpClient(environment());
}

export default client;
