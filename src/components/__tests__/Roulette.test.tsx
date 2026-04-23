import { render, screen, fireEvent, act } from '@testing-library/react'
import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest'
import { Roulette } from '../Roulette'

describe('Roulette', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  test('初期描画で 1〜10 の数字が全て表示される (連番配置)', () => {
    render(<Roulette />)
    for (let n = 1; n <= 10; n++) {
      expect(screen.getByText(String(n))).toBeInTheDocument()
    }
  })

  test('初期状態では結果が表示されていない', () => {
    render(<Roulette />)
    expect(screen.queryByText(/結果:/)).not.toBeInTheDocument()
  })

  test('スピンボタン押下で「回転中…」表示になり disabled になる', () => {
    render(<Roulette />)
    const button = screen.getByRole('button', { name: 'ルーレットを回す' })
    fireEvent.click(button)

    const spinningButton = screen.getByRole('button', { name: '回転中…' })
    expect(spinningButton).toBeDisabled()
  })

  test('スピン完了後に 1〜10 の範囲で結果が表示される', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.5)

    render(<Roulette />)
    fireEvent.click(screen.getByRole('button', { name: 'ルーレットを回す' }))

    act(() => {
      vi.advanceTimersByTime(4000)
    })

    const result = screen.getByText(/結果:/)
    expect(result).toBeInTheDocument()
    const match = result.textContent?.match(/結果:\s*(\d+)/)
    expect(match).not.toBeNull()
    const n = Number(match?.[1])
    expect(n).toBeGreaterThanOrEqual(1)
    expect(n).toBeLessThanOrEqual(10)
  })

  test('Math.random を固定すると結果が決定論的になる (表示とロジックが一致)', () => {
    // Math.random() の最初の呼び出しで winnerIndex が決まる: floor(0.05 * 10) = 0 → 数字 1
    const randomValues = [0.05, 0.5, 0.5]
    let i = 0
    vi.spyOn(Math, 'random').mockImplementation(() => randomValues[i++] ?? 0.5)

    render(<Roulette />)
    fireEvent.click(screen.getByRole('button', { name: 'ルーレットを回す' }))

    act(() => {
      vi.advanceTimersByTime(4000)
    })

    expect(screen.getByText('結果: 1')).toBeInTheDocument()
  })

  test('回転中はボタンの再押下で新たなスピンが始まらない', () => {
    const spy = vi.spyOn(Math, 'random').mockReturnValue(0.5)

    render(<Roulette />)
    fireEvent.click(screen.getByRole('button', { name: 'ルーレットを回す' }))
    const callsAfterFirst = spy.mock.calls.length

    // disabled 状態だが念のため何度か試行
    const spinning = screen.getByRole('button', { name: '回転中…' })
    fireEvent.click(spinning)
    fireEvent.click(spinning)
    expect(spy.mock.calls.length).toBe(callsAfterFirst)

    act(() => {
      vi.advanceTimersByTime(4000)
    })

    // 停止後は再度クリック可能になる
    const idle = screen.getByRole('button', { name: 'ルーレットを回す' })
    fireEvent.click(idle)
    expect(spy.mock.calls.length).toBeGreaterThan(callsAfterFirst)
  })
})
