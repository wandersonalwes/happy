import { useEffect, useState, FormEvent } from 'react'
import { useAuth } from '../contexts/auth'
import { useRouter } from 'next/router'

import api from '../services/api'

import Hero from '../components/auth/hero'
import InputBlock from '../components/input-block'

import { Container, Form } from '../styles/pages/auth'
import HeaderForm from '../components/auth/header-form'
import Alert from '../components/alert'
import Button from '../components/button'

const ResetPassword = () => {
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [loading, setLoading] = useState(false)
  const [resetSuccess, setResetSuccess] = useState(false)

  const router = useRouter()

  const { signed } = useAuth()

  useEffect(() => {
    if (signed) {
      router.push('/')
    }
  }, [signed])

  async function handleSubmitResetPassword(event: FormEvent) {
    event.preventDefault()
    setLoading(true)

    try {
      await api.post(
        'reset_password',
        { password, passwordConfirmation },
        {
          params: {
            email: router.query.email,
            token: router.query.token
          }
        }
      )

      setLoading(false)
      setResetSuccess(true)

      setTimeout(() => router.push('/login'), 4000)
    } catch (error) {
      console.log(error.request)
    }
  }
  return (
    <Container>
      <Hero />

      {resetSuccess && <Alert message="Senha alterada com sucesso ;)" />}

      <Form onSubmit={handleSubmitResetPassword}>
        <HeaderForm
          title="Redefinição de senha"
          description="Escolha uma nova senha para você acessar o dashboard do Happy"
        />
        <InputBlock
          type="password"
          label="Nova senha"
          name="password"
          value={password}
          onChange={event => setPassword(event.target.value)}
        />

        <InputBlock
          type="password"
          label="Repetir senha"
          name="confirm-password"
          value={passwordConfirmation}
          onChange={event => setPasswordConfirmation(event.target.value)}
        />

        <Button
          variant="success"
          disabled={!password || !passwordConfirmation}
          type="submit"
          loading={loading}
        >
          Redefinir
        </Button>
      </Form>
    </Container>
  )
}

export default ResetPassword
