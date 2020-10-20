import { InputHTMLAttributes } from 'react'
import { Container } from '../styles/components/input-block'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label: string
}

export default function InputBlock({ label, name, ...rest }: InputProps) {
  return (
    <Container>
      <label htmlFor={name}>{label}</label>
      <input id={name} {...rest} />
    </Container>
  )
}
