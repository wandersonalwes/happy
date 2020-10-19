import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import User from '../models/User'
import bcrypt from 'bcrypt'
import * as Yup from 'yup'

export default {
  async create(request: Request, response: Response) {

    const { name, email, password } = request.body

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required('Password is required').min(6),
      passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Password confirm is required')
    })

    await schema.validate(request.body, { abortEarly: false })

    const salt = bcrypt.genSaltSync(8)

    const passwordHash = bcrypt.hashSync(password, salt)

    const userRepository = getRepository(User)

    const userExists = await userRepository.findOne({ email })

    if (userExists) {
      return response.status(409).json({ message: 'User already exists' })
    }

    const user = userRepository.create({ name, email, password: passwordHash })

    userRepository.save(user)

    return response.json(user)
  },
}