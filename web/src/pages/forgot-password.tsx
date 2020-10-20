import { useEffect, useState, FormEvent } from 'react'
import { Container, Form } from '../styles/pages/auth'
import Hero from '../components/auth/hero'
import InputBlock from '../components/input-block'
import HeaderForm from '../components/auth/header-form'
import Alert from '../components/alert'
import Button from '../components/button'
import { useAuth } from '../contexts/auth'
import { useRouter } from 'next/router'

import api from '../services/api'

export default function ForgotPassword() {
  const router = useRouter()
  const { signed } = useAuth()

  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  useEffect(() => {
    if (signed) {
      router.push('/')
    }
  }, [signed])

  async function handleSubmitForgotPassword(event: FormEvent) {
    event.preventDefault()
    setLoading(true)

    try {
      await api.post('forgot_password', { email })

      setLoading(false)
      setEmailSent(true)

      setTimeout(() => setEmailSent(false), 4000)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Container>
      {emailSent && <Alert message="E-mail enviado com sucesso :)" />}
      <Hero />

      <Form onSubmit={handleSubmitForgotPassword}>
        <HeaderForm
          title="Esqueci a senha"
          description="Sua redefinição de senha será enviada para o e-mail cadastrado."
        />

        <InputBlock
          type="email"
          label="E-mail"
          name="email"
          value={email}
          onChange={event => setEmail(event.target.value)}
        />

        <Button
          variant="success"
          disabled={!email || loading}
          type="submit"
          loading={loading}
        >
          Redefinir
        </Button>
      </Form>
    </Container>
  )
}
