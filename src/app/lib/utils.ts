import jwt from "jsonwebtoken";

export const verifyJwtToken = (authToken: string | null) => {
  try {
    if (!authToken) {
      return null;
    }
    const decodedUserInfo = jwt.verify(authToken, "OPWDER3456IOPPP");
    console.log("decodedUserInfo ==>  ", decodedUserInfo);
    return decodedUserInfo;
  } catch (error) {
    console.log(`JWT verification failed !! `, error);
    return null;
  }
};
