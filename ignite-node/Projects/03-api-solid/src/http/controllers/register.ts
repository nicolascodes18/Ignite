import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UserAlreadyExists } from '@/use-cases/errors/user-already-exists'
import { RegisterUseCase } from '@/use-cases/register'
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    const userRepository = new PrismaUsersRepository()
    const registerUserCase = new RegisterUseCase(userRepository)

    await registerUserCase.handle({
      name, 
      email,
      password
    })
  } catch (err) {
    if(err instanceof UserAlreadyExists) {
      return reply.status(409).send({
        message: err.message
      })
    }

    throw err

    // return reply.status(500).send()
  }

  return reply.status(201).send()
}
