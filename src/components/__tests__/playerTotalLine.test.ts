import { describe, test, expect } from 'vitest'
import {
  formatPlayerTotalLine,
  totalsVisibilityButtonLabel,
} from '../playerTotalLine'

describe('formatPlayerTotalLine', () => {
  test('表示中の35000は 合計所持金: $35,000 になる', () => {
    expect(formatPlayerTotalLine(35000, true)).toBe('合計所持金: $35,000')
  })

  test('表示中の0は 合計所持金: $0 になる', () => {
    expect(formatPlayerTotalLine(0, true)).toBe('合計所持金: $0')
  })

  test('非表示の35000は 合計所持金: 非表示 になる', () => {
    expect(formatPlayerTotalLine(35000, false)).toBe('合計所持金: 非表示')
  })

  test('非表示の0は 合計所持金: 非表示 になる', () => {
    expect(formatPlayerTotalLine(0, false)).toBe('合計所持金: 非表示')
  })
})

describe('totalsVisibilityButtonLabel', () => {
  test('表示中のボタンラベルは 合計を隠す', () => {
    expect(totalsVisibilityButtonLabel(true)).toBe('合計を隠す')
  })

  test('非表示中のボタンラベルは 合計を表示', () => {
    expect(totalsVisibilityButtonLabel(false)).toBe('合計を表示')
  })
})
