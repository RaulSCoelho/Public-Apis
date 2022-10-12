import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { Home } from 'pages/Home'
import { Locations } from 'pages/Locations'
import { Translate } from 'pages/Translate'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/translate" element={<Translate />} />
      <Route path="/locations" element={<Locations />} />
    </Routes>
  )
}
