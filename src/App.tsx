import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import MainContent from './components/MainContent'
import PrivacyPolicy from './pages/Privacy'

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
