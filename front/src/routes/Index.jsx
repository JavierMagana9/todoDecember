import React from 'react'
import { Route, Routes } from 'react-router-dom'
import IntroPage from '../pages/IntroPage'

const Index = () => {
  return (
    <div>
      <Routes>
       <Route path="/" element={<IntroPage />} /> 
        {/* <Route path="/todos" element={<TodoPage />} /> */}
      </Routes>
    </div>
  )
}

export default Index
