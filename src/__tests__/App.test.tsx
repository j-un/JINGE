import { render, screen, fireEvent } from '@testing-library/react'
import { describe, test, expect } from 'vitest'
import App from '../App'

describe('App', () => {
  test('初期レンダリング時にタイトルと説明文が表示される', () => {
    render(<App />)

    expect(screen.getByText('JINGE - β Ver.')).toBeInTheDocument()
    expect(
      screen.getByText('タカラトミー社「人生ゲーム」の紙幣管理をデジタル化し、所持金集計、片付けを簡単に')
    ).toBeInTheDocument()
    expect(
      screen.getByText('ブラウザのみで動作するため、サーバーサイドにユーザーデータは一切保存しません')
    ).toBeInTheDocument()
    expect(screen.getByLabelText('プレイヤー数 (1～6):')).toBeInTheDocument()
  })

  test('プレイヤー数を変更できる', () => {
    render(<App />)

    const input = screen.getByLabelText('プレイヤー数 (1～6):')
    fireEvent.change(input, { target: { value: '3' } })

    expect(input).toHaveValue(3)
  })

  test('リセットボタンでプレイヤー数を更新できる', () => {
    render(<App />)

    const input = screen.getByLabelText('プレイヤー数 (1～6):')
    fireEvent.change(input, { target: { value: '3' } })

    const resetButton = screen.getByText('リセット')
    fireEvent.click(resetButton)

    const playerBoards = screen.getAllByText(/プレイヤー \d/)
    expect(playerBoards).toHaveLength(3)
  })

  test('プレイヤー数が1-6の範囲に制限される', () => {
    render(<App />)

    const input = screen.getByLabelText('プレイヤー数 (1～6):')

    fireEvent.change(input, { target: { value: '0' } })
    const resetButton = screen.getByText('リセット')
    fireEvent.click(resetButton)
    let playerBoards = screen.getAllByText(/プレイヤー \d/)
    expect(playerBoards).toHaveLength(1)

    fireEvent.change(input, { target: { value: '7' } })
    fireEvent.click(resetButton)
    playerBoards = screen.getAllByText(/プレイヤー \d/)
    expect(playerBoards).toHaveLength(6)
  })

  test('各プレイヤーボードが正しく表示される', () => {
    render(<App />)

    const input = screen.getByLabelText('プレイヤー数 (1～6):')
    fireEvent.change(input, { target: { value: '2' } })

    const resetButton = screen.getByText('リセット')
    fireEvent.click(resetButton)

    const playerBoards = screen.getAllByText(/プレイヤー \d/)
    expect(playerBoards).toHaveLength(2)

    const totalAmounts = screen.getAllByText('合計所持金: $0')
    expect(totalAmounts).toHaveLength(2)
  })
})
