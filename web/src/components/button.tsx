import { ButtonHTMLAttributes } from 'react'
import { MyButton } from '../styles/components/button'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'success' | 'danger'
  loading?: boolean
  className?: string
}

export default function Button({
  variant = 'success',
  loading,
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <MyButton className={`${variant} ${className}`} {...rest}>
      {loading ? <span className="loader"></span> : children}
    </MyButton>
  )
}
