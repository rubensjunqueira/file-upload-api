import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { auth } from "../config/auth";
import { InvalidSignatureError } from "../errors/InvalidSignatureError";
import { TokenMissingError } from "../errors/TokenMissinError";

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new TokenMissingError();
  }

  const [, token] = authorization.split(" ");

  try {
    const { sub } = verify(token, auth.secret) as IPayload;

    req.user = {
      id: sub,
    };

    next();
  } catch (err) {
    throw new InvalidSignatureError(err.message);
  }
}
