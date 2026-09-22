import { render, screen, fireEvent } from '@testing-library/react'
import { describe, test, expect } from 'vitest'
import { MainContent } from '../MainContent'

describe('MainContent', () => {
  test('初期レンダリング時に説明文が表示される', () => {
    render(<MainContent />)

    expect(
      screen.getByText('タカラトミー「人生ゲーム」の紙幣管理をデジタル化')
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        'ブラウザのみで動作するため、サーバーサイドにユーザーデータは一切保存しません'
      )
    ).toBeInTheDocument()
    expect(screen.getByLabelText('プレイヤー数 (1～6):')).toBeInTheDocument()
  })

  test('プレイヤー数を変更できる', () => {
    render(<MainContent />)

    const input = screen.getByLabelText('プレイヤー数 (1～6):')
    fireEvent.change(input, { target: { value: '3' } })

    expect(input).toHaveValue(3)
  })

  test('リセットボタンでプレイヤー数を更新できる', () => {
    render(<MainContent />)

    const input = screen.getByLabelText('プレイヤー数 (1～6):')
    fireEvent.change(input, { target: { value: '3' } })

    const resetButton = screen.getByText('リセット')
    fireEvent.click(resetButton)

    const playerBoards = screen.getAllByText(/プレイヤー \d/)
    expect(playerBoards).toHaveLength(3)
  })

  test('プレイヤー数が1-6の範囲に制限される', () => {
    render(<MainContent />)

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
    render(<MainContent />)

    const input = screen.getByLabelText('プレイヤー数 (1～6):')
    fireEvent.change(input, { target: { value: '2' } })

    const resetButton = screen.getByText('リセット')
    fireEvent.click(resetButton)

    const playerBoards = screen.getAllByText(/プレイヤー \d/)
    expect(playerBoards).toHaveLength(2)

    const totalAmounts = screen.getAllByText('合計所持金: $0')
    expect(totalAmounts).toHaveLength(2)
  })

  test('初期レンダリング時にデフォルト人数分の合計所持金: $0 が表示される', () => {
    render(<MainContent />)

    const totals = screen.getAllByText('合計所持金: $0')
    expect(totals).toHaveLength(1)
  })

  test('合計を隠すをクリックすると全ての合計が非表示になりボタンが合計を表示になる', () => {
    render(<MainContent />)

    fireEvent.click(screen.getByRole('button', { name: '合計を隠す' }))

    const masked = screen.getAllByText('合計所持金: $---')
    expect(masked).toHaveLength(1)
    expect(screen.queryByText('合計所持金: $0')).not.toBeInTheDocument()

    const showButton = screen.getByRole('button', { name: '合計を表示' })
    expect(showButton).toHaveAttribute('aria-pressed', 'true')
  })

  test('合計を表示をクリックすると全ての合計が合計所持金: $0 に戻る', () => {
    render(<MainContent />)

    fireEvent.click(screen.getByRole('button', { name: '合計を隠す' }))
    fireEvent.click(screen.getByRole('button', { name: '合計を表示' }))

    const totals = screen.getAllByText('合計所持金: $0')
    expect(totals).toHaveLength(1)
    expect(screen.queryByText('合計所持金: $---')).not.toBeInTheDocument()
  })

  test('マスク中にリセットすると合計が合計所持金: $0 に戻る', () => {
    render(<MainContent />)

    fireEvent.click(screen.getByRole('button', { name: '合計を隠す' }))
    fireEvent.click(screen.getByRole('button', { name: 'リセット' }))

    const totals = screen.getAllByText('合計所持金: $0')
    expect(totals).toHaveLength(1)
  })

  test('マスク中も紙幣の+ボタンが残る', () => {
    render(<MainContent />)

    fireEvent.click(screen.getByRole('button', { name: '合計を隠す' }))

    expect(
      screen.getByRole('button', { name: '$1000を増やす' })
    ).toBeInTheDocument()
  })

  test('初期状態ではルーレットモーダルは表示されていない', () => {
    render(<MainContent />)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  test('「ルーレット」ボタンが表示される', () => {
    render(<MainContent />)
    expect(
      screen.getByRole('button', { name: 'ルーレット' })
    ).toBeInTheDocument()
  })

  test('「ルーレット」ボタン押下でモーダルが開く', () => {
    render(<MainContent />)
    fireEvent.click(screen.getByRole('button', { name: 'ルーレット' }))

    const dialog = screen.getByRole('dialog')
    expect(dialog).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'ルーレットを回す' })
    ).toBeInTheDocument()
  })

  test('モーダルの閉じるボタンでモーダルが閉じる', () => {
    render(<MainContent />)
    fireEvent.click(screen.getByRole('button', { name: 'ルーレット' }))
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    fireEvent.click(screen.getByLabelText('閉じる'))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
