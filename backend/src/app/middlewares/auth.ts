import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import authConfig from '../../config/auth'

interface DecodedTokenProps {
  id: number
}

export default async function (request: Request, response: Response, next: NextFunction) {

  const authHeader = request.headers.authorization

  if (!authHeader) {
    return response.status(401).json({ error: 'Token not provided' })
  }

  const [, token] = authHeader.split(' ')

  try {
    const decoded = jwt.verify(token, authConfig.secret) as DecodedTokenProps

    request.userId = decoded.id

    console.log(decoded)
    return next()

  } catch (error) {
    return response.status(401).json({ error: 'Token invalid' })
  }
}