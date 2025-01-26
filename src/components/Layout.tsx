import React from 'react'
import { Link } from 'react-router-dom'

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="layout-container">
      <header className="layout-header">
        <Link to="/" className="header-link">
          <h1 className="header-title">JINGE - β Ver.</h1>
        </Link>
      </header>

      <main className="layout-main">
        {children}
      </main>

      <footer className="layout-footer">
        <small className="footer-links">
          関連リンク:{' '}
          <Link to="/" className="footer-link">Top</Link>
          {' | '}
          <Link to="/privacy" className="footer-link">Privacy Policy</Link>
          {' | '}
          <a
            href="https://github.com/j-un/JINGE"
            target="_blank"
            rel="noopener"
            className="footer-link"
          >
            GitHub
          </a>
        </small>
        <br />
        <small className="footer-copyright">
          © {new Date().getFullYear()} JINGE. All rights reserved.
        </small>
      </footer>
    </div>
  )
}

export default Layout
