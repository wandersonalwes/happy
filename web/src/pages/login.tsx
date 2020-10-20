import { FormEvent, useState, useEffect } from 'react'
import Link from 'next/link'
import { Container, Form } from '../styles/pages/auth'
import InputBlock from '../components/input-block'
import Hero from '../components/auth/hero'
import HeaderForm from '../components/auth/header-form'
import Button from '../components/button'
import { FiArrowLeft } from 'react-icons/fi'
import { useAuth } from '../contexts/auth'
import { useRouter } from 'next/router'

export default function Login() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberPassword, setRememberPassword] = useState(false)

  const { signIn, signed } = useAuth()

  async function handleSignIn(event: FormEvent) {
    event.preventDefault()

    signIn(email, password, rememberPassword)
  }

  useEffect(() => {
    if (signed) {
      router.push('/')
    }
  }, [signed])

  return (
    <Container>
      <Hero />
      <Form onSubmit={handleSignIn}>
        <Link href="/">
          <a className="go-back">
            <FiArrowLeft size={24} color="#15C3D6" />
          </a>
        </Link>

        <HeaderForm title="Fazer login" />

        <InputBlock
          type="email"
          label="E-mail"
          name="email"
          value={email}
          onChange={event => setEmail(event.target.value)}
        />

        <InputBlock
          type="password"
          label="Senha"
          name="password"
          value={password}
          onChange={event => setPassword(event.target.value)}
        />

        <div className="options-container">
          <label className="remember-password" htmlFor="remember-password">
            Lembrar-me
            <input
              type="checkbox"
              id="remember-password"
              checked={rememberPassword}
              onChange={() => setRememberPassword(!rememberPassword)}
            />
            <span className="checkmark"></span>
          </label>

          <Link href="/forgot-password">
            <a className="forgot-password">Esqueci minha senha</a>
          </Link>
        </div>

        <Button disabled={!email || !password} type="submit">
          Entrar
        </Button>
      </Form>
    </Container>
  )
}
