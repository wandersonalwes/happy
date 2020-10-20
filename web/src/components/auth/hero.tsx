import { Container } from '../../styles/components/auth/hero'

export default function Hero() {
  return (
    <Container>
      <header>
        <img src="/images/logotipo.svg" alt="Happy" />
      </header>
      <footer>
        <strong>Goiânia</strong>
        <span>Goiás</span>
      </footer>
    </Container>
  )
}
