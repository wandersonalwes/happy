import React from 'react'
import { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import AuthProvider from '../contexts/auth'

import GlobalStyle from '../styles/global'
import theme from '../styles/theme'
import 'leaflet/dist/leaflet.css'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
        <GlobalStyle />
      </ThemeProvider>
    </AuthProvider>
  )
}

export default MyApp
