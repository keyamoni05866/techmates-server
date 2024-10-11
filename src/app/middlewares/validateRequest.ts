import { AnyZodObject } from "zod";
import { catchAsync } from "../utils/catchAsync";
// import { catchAsync } from "../modules/utils/catchAsync";

export const validateRequest = (schema: AnyZodObject) => {
  return catchAsync(async (req, res, next) => {
    await schema.parseAsync({
      body: req.body,
    });
    next();
  });
};
