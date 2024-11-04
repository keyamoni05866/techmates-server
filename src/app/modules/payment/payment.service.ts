import { User } from "../user/user.model";
import { verifyPayment } from "./payment.util";

const paymentService = async (transactionId: string, status: string) => {
  console.log(transactionId, status);
  const verifyResponse = await verifyPayment(transactionId);
  let result;
  if (verifyResponse && verifyResponse.pay_status === "Successful") {
    result = await User.findOneAndUpdate(
      { transactionId },
      { verified: true, paymentStatus: "paid" },

      { new: true }
    );
  }
  return `<div style="text-align:center;margin-top:80px">
 <h3 style="color:#9753d3;">Payment ${status}</h3>
<p style="font-size:18px">You will be redirected shortly."</p>
<button style=" padding: 9px 30px;font-size: 18px;font-weight: 500;text-align: center;text-decoration: none;color: rgb(243, 243, 243);
  background-color: #9753d3;border: none;border-radius: 20px;"><a href="https://tech-mates-with-nextjs.vercel.app/">Home</a></button>
  </div>`;
};

export const paymentServices = {
  paymentService,
};
