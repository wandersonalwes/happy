import { useRouter } from 'next/router'
import { useState, createContext, useContext, useEffect } from 'react'
import api from '../services/api'

interface AuthContextValues {
  signed: boolean
  user: {
    id: number
    name: string
  } | null
  signIn: (
    email: string,
    password: string,
    rememberPassword: boolean
  ) => Promise<void>
  signOut: () => void
  loading: boolean
  error: unknown
}

const AuthContext = createContext({} as AuthContextValues)

export default function AuthProvider({ children }) {
  const router = useRouter()

  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStorageData() {
      const storageUser =
        localStorage.getItem('@Happy:user') ||
        sessionStorage.getItem('@Happy:user')

      const storageToken =
        localStorage.getItem('@Happy:token') ||
        sessionStorage.getItem('@Happy:token')

      if (storageUser && storageToken) {
        api.defaults.headers.Authorization = `Bearer ${storageToken}`

        setUser(JSON.parse(storageUser))
      }
    }

    loadStorageData()
  }, [])

  async function signIn(
    email: string,
    password: string,
    rememberPassword: boolean
  ) {
    try {
      const { data } = await api.post('/sessions', { email, password })

      setUser(data.user)

      api.defaults.headers.Authorization = `Bearer ${data.token}`

      if (rememberPassword) {
        localStorage.setItem('@Happy:user', JSON.stringify(data.user))
        localStorage.setItem('@Happy:token', data.token)
      } else {
        sessionStorage.setItem('@Happy:user', JSON.stringify(data.user))
        sessionStorage.setItem('@Happy:token', data.token)
      }

      return await router.push('/')
    } catch (error) {
      setError(error)
    }
  }
  function signOut() {
    console.log('')
  }
  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, signIn, signOut, loading, error }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  return context
}
