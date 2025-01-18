import { describe, test, expect } from 'vitest'
import { CURRENCIES, GAME_CONFIG } from '../gameConfig'

describe('gameConfig', () => {
  test('CURRENCIESの構造が正しい', () => {
    expect(CURRENCIES).toBeInstanceOf(Array)
    expect(CURRENCIES.length).toBe(11)

    CURRENCIES.forEach(currency => {
      expect(currency).toHaveProperty('name')
      expect(currency).toHaveProperty('value')
      expect(currency).toHaveProperty('img')
    })
  })

  test('通貨の値が正しく設定されている', () => {
    const expectedValues = {
      $1000: 1000,
      $5000: 5000,
      $10000: 10000,
      $20000: 20000,
      $50000: 50000,
      $100000: 100000,
      $20000約束手形: 0,
      生命保険証: 0,
      株券: 0,
      火災保険: 0,
      自動車保険: 0,
    }

    CURRENCIES.forEach(currency => {
      expect(currency.value).toBe(
        expectedValues[currency.name as keyof typeof expectedValues]
      )
    })
  })

  test('GAME_CONFIGの値が正しく設定されている', () => {
    expect(GAME_CONFIG.MIN_PLAYERS).toBe(1)
    expect(GAME_CONFIG.MAX_PLAYERS).toBe(6)
    expect(GAME_CONFIG.INITIAL_PLAYER_COUNT).toBe(1)
  })

  test('画像パスが正しく設定されている', () => {
    CURRENCIES.forEach(currency => {
      expect(currency.img).toBeTruthy()
      expect(typeof currency.img).toBe('string')
    })
  })
})
