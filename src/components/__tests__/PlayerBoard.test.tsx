import { render, fireEvent, screen } from '@testing-library/react'
import { describe, test, expect, beforeEach, vi } from 'vitest'
import { PlayerBoard } from '../PlayerBoard'
import { Currency } from '../../types'

describe('PlayerBoard', () => {
  const mockCurrencies: Currency[] = [
    {
      name: '10000円札',
      value: 10000,
      img: '/images/10000.png',
    },
    {
      name: '5000円札',
      value: 5000,
      img: '/images/5000.png',
    },
  ]

  const defaultProps = {
    playerId: 1,
    currencyCounts: [2, 3],
    currencies: mockCurrencies,
    onUpdateCurrency: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('初期レンダリング時にプレイヤー名と合計金額が表示される', () => {
    render(<PlayerBoard {...defaultProps} />)

    expect(screen.getByText('プレイヤー 1')).toBeInTheDocument()
    expect(screen.getByText('合計所持金: $35,000')).toBeInTheDocument()
  })

  test('プレイヤー名をクリックすると編集モードになる', () => {
    render(<PlayerBoard {...defaultProps} />)

    fireEvent.click(screen.getByText('プレイヤー 1'))

    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()
    expect(input).toHaveValue('プレイヤー 1')
  })

  test('プレイヤー名を編集して保存できる', () => {
    render(<PlayerBoard {...defaultProps} />)

    fireEvent.click(screen.getByText('プレイヤー 1'))
    const input = screen.getByRole('textbox')

    fireEvent.change(input, { target: { value: 'テストプレイヤー' } })
    fireEvent.blur(input)

    expect(screen.getByText('テストプレイヤー')).toBeInTheDocument()
  })

  //   test('Enterキーでプレイヤー名の編集を完了できる', () => {
  //     render(<PlayerBoard {...defaultProps} />);

  //     fireEvent.click(screen.getByText('プレイヤー 1'));
  //     const input = screen.getByRole('textbox');

  //     fireEvent.change(input, { target: { value: 'テストプレイヤー' } });
  //     fireEvent.keyPress(input, { key: 'Enter', code: 'Enter' });

  //     expect(screen.getByText('テストプレイヤー')).toBeInTheDocument();
  //   });

  test('紙幣の増減ボタンが正しく動作する', () => {
    render(<PlayerBoard {...defaultProps} />)

    const plusButtons = screen.getAllByText('+')
    const minusButtons = screen.getAllByText('-')

    fireEvent.click(plusButtons[0])
    expect(defaultProps.onUpdateCurrency).toHaveBeenCalledWith(1, 0, 1)

    fireEvent.click(minusButtons[1])
    expect(defaultProps.onUpdateCurrency).toHaveBeenCalledWith(1, 1, -1)
  })

  test('全ての紙幣画像が表示される', () => {
    render(<PlayerBoard {...defaultProps} />)

    const images = screen.getAllByRole('img')
    expect(images).toHaveLength(mockCurrencies.length)

    images.forEach((img, index) => {
      expect(img).toHaveAttribute('src', mockCurrencies[index].img)
      expect(img).toHaveAttribute('alt', mockCurrencies[index].name)
    })
  })
})
