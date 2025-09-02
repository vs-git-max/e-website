import paypal from "@paypal/checkout-server-sdk";
import client from "../config/paypalClient.js";

const createOrder = async (req, res) => {
  try {
    const { userId, cartItems, addressInfo, totalAmount } = req.body;

    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: totalAmount.toFixed(2),
            breakdown: {
              item_total: {
                currency_code: "USD",
                value: totalAmount.toFixed(2),
              },
            },
          },
          shipping: {
            name: {
              full_name: addressInfo?.name || "Customer",
            },
            address: {
              address_line_1: addressInfo?.street || "123 Main St",
              admin_area_2: addressInfo?.city || "City",
              admin_area_1: addressInfo?.state || "State",
              postal_code: addressInfo?.zip || "10001",
              country_code: addressInfo?.country || "US",
            },
          },
          items: cartItems.map((item) => ({
            name: item.name,
            unit_amount: {
              currency_code: "USD",
              value: item.price.toFixed(2),
            },
            quantity: item.quantity.toString(),
          })),
        },
      ],
      application_context: {
        return_url: "http://localhost:3000/payment-success",
        cancel_url: "http://localhost:3000/payment-cancel",
      },
    });

    const order = await client().execute(request);

    const approvalUrl = order.result.links.find(
      (link) => link.rel === "approve"
    )?.href;

    res.status(200).json({
      success: true,
      orderId: order.result.id,
      approvalUrl,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: "Error creating PayPal order",
      error: error.message,
    });
  }
};

export default createOrder;
