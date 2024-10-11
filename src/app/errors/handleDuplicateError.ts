import {
  TErrorSources,
  TGenericErrorResponse,
} from "../interface/error.interface";

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const match = err.message.match(/"([^"]*)"/);
  const extractMessage = match && match[1];
  const errorSources: TErrorSources = [
    {
      path: "",
      message: `${extractMessage} is already Exists`,
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: "Duplicate Insert Error",
    errorSources,
  };
};
export default handleDuplicateError;
