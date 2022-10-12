import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { Box } from 'components/Box'
import { Router } from 'Router'

import GlobalStyle from './styles/global'

const App: React.FC = () => {
  return (
    <>
      <Box>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </Box>
      <GlobalStyle />
    </>
  )
}

export default App
