import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import User from '../models/User'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import authConfig from '../../config/auth'
import Mail from '../../lib/Mail'
import crypto from 'crypto'
import * as Yup from 'yup'

export default {
  async create(request: Request, response: Response) {

    const { email, password } = request.body

    const userRepository = getRepository(User)

    const user = await userRepository.findOne({ email })

    if (!user) {
      return response.status(404).json({ error: 'User not found' })
    }

    const equalPasswords = bcrypt.compareSync(password, user.password)

    if (!equalPasswords) {
      return response.status(401).json({ error: 'Password does not match' })
    }


    return response.json({
      user: {
        name: user.name,
        email: user.email
      },
      token: jwt.sign({ id: user.id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn
      })
    })
  },
  async forgotPassword(request: Request, response: Response) {
    const { email } = request.body

    const schema = Yup.object().shape({
      email: Yup.string().email().required()
    })

    await schema.validate(request.body)

    const userRepository = getRepository(User)

    const user = await userRepository.findOne({ email })

    if (!user) {
      return response.status(404).json({ error: 'User not found' })
    }

    const token = crypto.randomBytes(20).toString('hex')

    const now = new Date()

    now.setHours(now.getHours() + 1)

    const data = {
      password_reset_token: token,
      password_reset_expires: now
    }

    userRepository.update(user.id, data)

    Mail.sendMail({
      to: email,
      subject: 'Solicitação de redefinição de senha',
      template: 'auth/forgot_password',
      context: { token, email: user.email },
    })
      .then(() => response.send())
      .catch((error) => response.status(400).json({ error }));
  },

  async resetPassword(request: Request, response: Response) {
    const { email, token } = request.query
    const { password, passwordConfirmation } = request.body

    const data = {
      email,
      token,
      password,
      passwordConfirmation
    }

    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      token: Yup.string().required(),
      password: Yup.string().required('Password is required').min(6),
      passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Password confirm is required')
    })

    await schema.validate(data, { abortEarly: false })

    const userRepository = getRepository(User)

    const user = await userRepository.findOne({ email: String(email) })

    if (!user) {
      return response.status(404).json({ error: 'User not found' })
    }

    if (token !== user.password_reset_token) {
      return response.status(401).json({ error: 'Token invalid' })
    }

    const now = new Date()

    if (now > user.password_reset_expires) {
      return response.status(401).json({ error: 'Token expired, generate a new one' })
    }

    const salt = bcrypt.genSaltSync(8)

    const passwordHash = bcrypt.hashSync(password, salt)

    userRepository.update(user.id, {
      password: passwordHash,
      password_reset_token: '',
      password_reset_expires: ''
    })

    response.status(201).json({
      message: 'Password updated successfully'
    })
  }
}