import { prisma } from "../../../../database/prismaClient"
import { hash } from "bcrypt"

interface ICreateDeliveryman {
  username: string,
  password: string
}

export class CreateDeliverymanUseCase {
  async execute({ username, password }: ICreateDeliveryman) {

    // check if deliveryman exists
    const deliverymanExists = await prisma.deliveryman.findFirst({
      where: { 
        username: {
          equals: username,
          mode: "insensitive"
        }
      }
    })

    if (deliverymanExists) throw new Error("Username or password incorrect!")

    // encrypt password
    const hashPassword = await hash(password, 10)

    // create deliveryman
    const deliveryman = await prisma.deliveryman.create({
      data: {
        username, 
        password: hashPassword
      }
    })

    return deliveryman
  }
}