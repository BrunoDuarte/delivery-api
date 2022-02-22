import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

export async function ensureAuthenticateDeliveryman(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization

  if (!authHeader) return response.status(401).json({
    message: "Token missing!"
  })

  const [, token] = authHeader.split(" ")

  try {
    
    const { sub } = verify(token, "5cf0587c4165b4f21476ef5ebcdf9a77")
    request.id_deliveryman = sub
    return next()

  } catch (error) {
    return response.status(401).json({
      message: "Invalid token!"
    })
  }
}