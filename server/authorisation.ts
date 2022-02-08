import firebaseAdmin from "firebase-admin";
import { NextFunction, Request, Response } from "express";

const authorizeFirebaseToken = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json("Unauthorised");

  return firebaseAdmin
    .auth()
    .verifyIdToken(authorization)
    .then(({ uid }) => {
      res.locals.authorizedUserId = uid;
      next();
    });
};

export default authorizeFirebaseToken;
