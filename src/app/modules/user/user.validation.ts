import { z } from "zod";

const createUserValidations = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is Required" }),
    email: z.string().email("Invalid email address"),
    role: z.enum(["user", "admin"]),
    password: z.string({ required_error: "Password is required" }),

    termsConditionAccepted: z.boolean({
      required_error: "Terms Accepted Required",
    }),
    phone: z.string().optional(),
    address: z.string().optional(),
    status: z.string().default("active"),
  }),
});
const updateUserValidations = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    role: z.enum(["user", "admin"]).optional(),
    password: z.string().optional(),
    termsConditionAccepted: z.boolean().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    status: z.string().default("active").optional(),
  }),
});

export const userValidations = {
  createUserValidations,
  updateUserValidations,
};
