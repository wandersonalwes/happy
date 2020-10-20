import { Container } from '../styles/components/alert'

export default function Alert({ message }: { message: string }) {
  return (
    <Container>
      {message}
      <span></span>
    </Container>
  )
}
