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

  test('プレイヤー数を更新できる', () => {
    const { result } = renderHook(() => usePlayerManagement(defaultProps))

    act(() => {
      result.current.updatePlayerCount(4)
    })

    expect(result.current.players).toHaveLength(4)
  })

  test('プレイヤー数は1-6の範囲に制限される', () => {
    const { result } = renderHook(() => usePlayerManagement(defaultProps))

    act(() => {
      result.current.updatePlayerCount(0)
    })
    expect(result.current.players).toHaveLength(1)

    act(() => {
      result.current.updatePlayerCount(7)
    })
    expect(result.current.players).toHaveLength(6)
  })

  test('通貨カウントを更新できる', () => {
    const { result } = renderHook(() => usePlayerManagement(defaultProps))

    act(() => {
      result.current.updateCurrencyCount(1, 0, 1)
    })

    expect(result.current.players[0].currencyCounts[0]).toBe(1)
  })

  test('通貨カウントは0-99の範囲に制限される', () => {
    const { result } = renderHook(() => usePlayerManagement(defaultProps))

    act(() => {
      result.current.updateCurrencyCount(1, 0, -1)
    })
    expect(result.current.players[0].currencyCounts[0]).toBe(0)

    act(() => {
      for (let i = 0; i < 100; i++) {
        result.current.updateCurrencyCount(1, 0, 1)
      }
    })
    expect(result.current.players[0].currencyCounts[0]).toBe(99)
  })

  test('プレイヤーの合計金額が正しく計算される', () => {
    const { result } = renderHook(() => usePlayerManagement(defaultProps))

    act(() => {
      result.current.updateCurrencyCount(1, 0, 2)
      result.current.updateCurrencyCount(1, 1, 3)
    })

    const total = result.current.calculatePlayerTotal(
      result.current.players[0].currencyCounts
    )
    expect(total).toBe(35000)
  })
})
