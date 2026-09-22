import { describe, expect, test } from 'vitest'
import { CURRENCIES } from './constants/gameConfig'
import {
  adjustCount,
  createPlayers,
  playerTotal,
  resetPlayers,
} from './players'
import { Currency } from './types'

describe('createPlayers', () => {
  test('2人・3金種は id が 1 からで枚数が 0', () => {
    expect(createPlayers(2, 3)).toEqual([
      { id: 1, currencyCounts: [0, 0, 0] },
      { id: 2, currencyCounts: [0, 0, 0] },
    ])
  })
})

describe('resetPlayers', () => {
  test('0 は min の 1 人になり、9 は max の 6 人になる', () => {
    expect(resetPlayers(0, 3, 1, 6)).toHaveLength(1)
    expect(resetPlayers(9, 3, 1, 6)).toHaveLength(6)
  })
})

describe('adjustCount', () => {
  test('0 から減らしても 0、99 から増やしても 99', () => {
    const floored = adjustCount(createPlayers(1, 1), 1, 0, -1)
    expect(floored[0].currencyCounts[0]).toBe(0)

    const capped = adjustCount([{ id: 1, currencyCounts: [99] }], 1, 0, 1)
    expect(capped[0].currencyCounts[0]).toBe(99)
  })
})

describe('playerTotal', () => {
  test('10000 が 2 枚と 5000 が 3 枚で 35000', () => {
    const currencies: Currency[] = [
      { name: '10000円札', value: 10000, img: '/images/10000.png' },
      { name: '5000円札', value: 5000, img: '/images/5000.png' },
    ]
    expect(playerTotal([2, 3], currencies)).toBe(35000)
  })

  test('$1000 が 1 枚なら 1000、生命保険証が 1 枚なら 0', () => {
    const bill = CURRENCIES.findIndex(currency => currency.name === '$1000')
    const insurance = CURRENCIES.findIndex(
      currency => currency.name === '生命保険証'
    )
    const billCounts = CURRENCIES.map(() => 0)
    const insuranceCounts = CURRENCIES.map(() => 0)
    billCounts[bill] = 1
    insuranceCounts[insurance] = 1

    expect(playerTotal(billCounts, CURRENCIES)).toBe(1000)
    expect(playerTotal(insuranceCounts, CURRENCIES)).toBe(0)
  })
})
