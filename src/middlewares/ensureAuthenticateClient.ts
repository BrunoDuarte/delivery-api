import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken"

interface IPayload {
  sub: string
}

export async function ensureAuthenticateClient(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization

  if (!authHeader) return response.status(401).json({ 
    message: "Token missing"
  })

  // take the token from the authHeader
  const [, token] = authHeader.split(" ")

  try {
    
    const { sub } = verify(token, "5cf0587c4165b4f21476ef5ebcdf9a66") as IPayload
    request.id_client = sub
    return next()

  } catch (error) {
    return response.status(401).json({
      message: "Invalid token!"
    })
  }

}