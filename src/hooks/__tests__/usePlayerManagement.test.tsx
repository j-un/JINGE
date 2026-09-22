import { renderHook, act } from '@testing-library/react'
import { describe, test, expect } from 'vitest'
import { usePlayerManagement } from '../usePlayerManagement'
import { Currency } from '../../types'

describe('usePlayerManagement', () => {
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
    initialPlayerCount: 2,
    currencies: mockCurrencies,
  }

  test('初期状態が正しく設定される', () => {
    const { result } = renderHook(() => usePlayerManagement(defaultProps))

    expect(result.current.players).toHaveLength(2)
    expect(result.current.players[0].currencyCounts).toEqual([0, 0])
    expect(result.current.players[1].currencyCounts).toEqual([0, 0])
  })

  test('通貨カウントを更新できる', () => {
    const { result } = renderHook(() => usePlayerManagement(defaultProps))

    act(() => {
      result.current.updateCurrencyCount(1, 0, 1)
    })

    expect(result.current.players[0].currencyCounts[0]).toBe(1)
  })
})
