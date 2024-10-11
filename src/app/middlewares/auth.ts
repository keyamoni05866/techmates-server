import config from "../config";
import AppError from "../errors/AppError";
import jwt, { JwtPayload } from "jsonwebtoken";
import { catchAsync } from "../utils/catchAsync";
import { USER_Role } from "../modules/user/user.constant";
import { User } from "../modules/user/user.model";

const auth = (...requiredRoles: (keyof typeof USER_Role)[]) => {
  return catchAsync(async (req, res, next) => {
    const header = req.headers.authorization;
    // console.log("header", header);
    if (header && header.startsWith("Bearer")) {
      const token = header.split(" ")[1];
      // console.log("token", token);

      const decoded = jwt.verify(
        token,
        config.jwt_access_secret as string
      ) as JwtPayload;

      const { email } = decoded;

      const user = await User.findOne({ email });
      if (!user) {
        throw new AppError(401, "User Not Found");
      }
      req.user = decoded as JwtPayload;
    } else {
      res.status(401).json({
        success: false,
        statusCode: 401,
        message: "You have no access to this route",
      });
    }
    next();
  });
};

export default auth;
