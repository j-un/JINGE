import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Layout.module.css'

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <h1 className={styles.title}>JINGE - β Ver.</h1>
        </Link>
      </header>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <small>
            関連リンク: <Link to="/">Top</Link>
            {' | '}
            <Link to="/privacy">Privacy Policy</Link>
            {' | '}
            <a
              href="https://github.com/j-un/JINGE"
              target="_blank"
              rel="noopener"
            >
              GitHub
            </a>
          </small>
          <br />
          <br />
          <small>
            © {new Date().getFullYear()} JINGE. All rights reserved.
          </small>
        </div>
      </footer>
    </div>
  )
}

export default Layout
