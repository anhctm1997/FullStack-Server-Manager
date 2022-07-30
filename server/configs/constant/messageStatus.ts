const messageStatus = (code: number, message: string = "") => {
  switch (code) {
    case 200:
      return {
        response: "Successfuly",
        message: message,
      };
    case 400:
      return {
        response: "Bad Request",
        message: message,
      };
    case 401:
      return {
        response: "Unauthorized",
        message: message,
      };
    case 403:
      return {
        response: "Forbidden",
        message: message,
      };

    case 404:
      return {
        response: "Not Found",
        message: message,
      };
    case 500:
      return {
        response: "Internal Server Error",
        message: message,
      };
    default:
      break;
  }
};
export default messageStatus;
