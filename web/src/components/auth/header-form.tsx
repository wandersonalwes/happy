import { Container } from '../../styles/components/auth/header-form'

interface HeaderFormProps {
  title: string
  description?: string
}

export default function HeaderForm({ title, description }: HeaderFormProps) {
  return (
    <Container>
      <h2>{title}</h2>
      <p>{description}</p>
    </Container>
  )
}
