import { prisma } from "../../../database/prismaClient"
import { compare } from "bcrypt"
import { sign } from "jsonwebtoken"

interface IAuthenticateClient {
  username: string
  password: string
}

export class AuthenticateClientUseCase {
  async execute({ username, password }: IAuthenticateClient) {

    // Receive username and password

    // Verify if username was created
    const client = await prisma.clients.findFirst({
      where: {
        username
      }
    })

    if (!client) throw new Error("Username or password incorrect!")

    // Verify if the password match
    const passwordMatch = await compare(password, client.password)

    if (!passwordMatch) throw new Error("Username or password incorrect!")

    // Generate token
    const token = sign ({username}, "5cf0587c4165b4f21476ef5ebcdf9a66", {
      subject: client.id,
      expiresIn: "1d"
    })

    return token

  }
}
