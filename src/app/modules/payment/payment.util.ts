import axios from "axios";
import config from "../../config";

export const initiatePayment = async (paymentData: any) => {
  console.log(paymentData);
  const {
    transactionId,
    totalCost,
    customerName,
    customerEmail,
    customerPhone,
  } = paymentData;

  const response = await axios.post(config.payment_url!, {
    store_id: config.payment_store_id,
    signature_key: config.payment_signature_key,
    tran_id: transactionId,
    success_url: `http://localhost:5000/api/payment/confirmation?transactionId=${transactionId}&status=success`,
    fail_url: `http://localhost:5000/api/payment/confirmation?status=failed`,
    cancel_url: "http://localhost:5000/",
    amount: totalCost,
    currency: "BDT",
    desc: "Merchant Registration Payment",
    cus_name: customerName,
    cus_email: customerEmail,
    cus_add1: "N/A",
    cus_add2: "N/A",
    cus_city: "N/A",
    cus_state: "N/A",
    cus_postcode: "N/A",
    cus_country: "Bangladesh",
    cus_phone: customerPhone,
    type: "json",
  });
  // console.log(response);
  return response.data;
};

export const verifyPayment = async (transactionId: string) => {
  const res = await axios.get(config.payment_verify_url!, {
    params: {
      store_id: config.payment_store_id,
      signature_key: config.payment_signature_key,
      type: "json",
      request_id: transactionId,
    },
  });
  // console.log("varify =>", res.data);
  return res.data;
};
