import { prisma } from "../../../database/prismaClient"
import { compare } from "bcrypt"
import { sign } from "jsonwebtoken"

interface IAuthenticateDeliveryman {
  username: string
  password: string
}

export class AuthenticateDeliverymanUseCase {

  async execute({ username, password }: IAuthenticateDeliveryman) {

    // verify if username already exists
    const deliveryman = await prisma.deliveryman.findFirst({
      where: {
        username
      }
    })

    if (!deliveryman) throw new Error("Username or password invalid!")

    // Verify if password match
    const passwordMatch = await compare(password, deliveryman.password)

    if (!passwordMatch) throw new Error("Username or password invalid!")

    // Generate token
    const token = sign({username}, "5cf0587c4165b4f21476ef5ebcdf9a77", {
      subject: deliveryman.id,
      expiresIn: "1d"
    })

    return token
  }
}