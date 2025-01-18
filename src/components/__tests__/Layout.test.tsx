import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, test, expect } from 'vitest'
import Layout from '../Layout'

describe('Layout', () => {
  test('ヘッダーにタイトルが表示される', () => {
    render(
      <BrowserRouter>
        <Layout>
          <div>Test Content</div>
        </Layout>
      </BrowserRouter>
    )

    expect(screen.getByText('JINGE - β Ver.')).toBeInTheDocument()
  })

  test('フッターに関連リンクとコピーライトが表示される', () => {
    render(
      <BrowserRouter>
        <Layout>
          <div>Test Content</div>
        </Layout>
      </BrowserRouter>
    )

    expect(screen.getByText(/関連リンク:/)).toBeInTheDocument()
    expect(screen.getByText('GitHub')).toBeInTheDocument()
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument()
    expect(
      screen.getByText(/© \d{4} JINGE\. All rights reserved\./)
    ).toBeInTheDocument()
  })

  test('子要素が正しくレンダリングされる', () => {
    render(
      <BrowserRouter>
        <Layout>
          <div>Test Content</div>
        </Layout>
      </BrowserRouter>
    )

    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })
})
