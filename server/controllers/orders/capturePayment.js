import paypal from "@paypal/checkout-server-sdk";
import client from "../config/paypalClient.js";

export const captureOrder = async (req, res) => {
  try {
    const { orderId } = req.body;

    const request = new paypal.orders.OrdersCaptureRequest(orderId);
    request.requestBody({});

    const capture = await client().execute(request);

    res.status(200).json({
      success: true,
      message: "Payment captured successfully",
      capture: capture.result,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: "Error capturing PayPal order",
      error: error.message,
    });
  }
};
