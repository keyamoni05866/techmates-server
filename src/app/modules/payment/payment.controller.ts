import { catchAsync } from "../../utils/catchAsync";
import { paymentServices } from "./payment.service";

const paymentConfirmation = catchAsync(async (req, res) => {
  const { transactionId, status } = req.query;
  const result = await paymentServices.paymentService(
    transactionId as string,
    status as string
  );
  res.send(result);
});

export const paymentController = {
  paymentConfirmation,
};
