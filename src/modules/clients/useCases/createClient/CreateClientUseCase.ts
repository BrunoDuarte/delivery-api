import { prisma } from "../../../../database/prismaClient"
import { hash } from "bcrypt"

interface ICreateClient {
  username: string
  password: string
}

export class CreateClientUseCase {

  async execute({ username, password }: ICreateClient) {

    // validate if client exists
    const clientExist = await prisma.clients.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive"
        }
      }
    })

    if(clientExist) throw new Error(`Client ${username} already exists`)

    // encrypt the password
    const hashPassword = await hash(password, 10)

    // save the customer
    const client = await prisma.clients.create({
      data: {
        username, 
        password: hashPassword
      }
    })

    return client
  }
}