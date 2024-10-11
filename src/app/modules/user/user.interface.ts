export type TUser = {
  name: string;
  email: string;
  role: "user" | "admin";
  password: string;
  termsConditionAccepted: boolean;
  phone?: string;
  address?: string;
  status: "active";
};
export type TUserProfileUpdate = {
  name?: string;
  email?: string;
  role?: "user" | "admin";
  oldPassword?: string;
  newPassword?: string;
  password: string;
  termsConditionAccepted?: boolean;
  phone?: string;
  address?: string;
};
