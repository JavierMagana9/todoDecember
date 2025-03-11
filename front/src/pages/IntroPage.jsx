import React from 'react'
import { Link } from 'react-router-dom'

const IntroPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cyan-50 p-4">
    <h1 className="text-4xl font-bold mb-8">Welcome to Your Todo App</h1>
    <p className="text-lg mb-10">Stay organized and boost your productivity</p>
    <Link 
      to="/todos" 
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
    >
      Get Started
    </Link>
  </div>
  )
}

export default IntroPage
