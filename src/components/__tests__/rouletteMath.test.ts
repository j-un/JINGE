import { describe, test, expect } from 'vitest'
import { computeNextRotation, resolveWinnerIndex } from '../rouletteMath'

const SEGMENT_COUNT = 10
const SEGMENT_ANGLE = 360 / SEGMENT_COUNT

describe('computeNextRotation', () => {
  test('初回スピン: winnerのセグメント中央がポインター(0度)方向に来る', () => {
    for (let winner = 0; winner < SEGMENT_COUNT; winner++) {
      const rotation = computeNextRotation({
        baseRotation: 0,
        winnerIndex: winner,
        jitter: 0,
        extraTurns: 5,
        segmentAngle: SEGMENT_ANGLE,
      })
      expect(resolveWinnerIndex(rotation, SEGMENT_COUNT)).toBe(winner)
    }
  })

  test('前回の累積回転があっても winner と停止位置が一致する', () => {
    const baseRotation = 2034 + 123 // 意図的に端数を残す
    for (let winner = 0; winner < SEGMENT_COUNT; winner++) {
      const rotation = computeNextRotation({
        baseRotation,
        winnerIndex: winner,
        jitter: 0,
        extraTurns: 3,
        segmentAngle: SEGMENT_ANGLE,
      })
      expect(resolveWinnerIndex(rotation, SEGMENT_COUNT)).toBe(winner)
    }
  })

  test('jitterを加えても同じセグメント内に停止する', () => {
    const maxJitter = SEGMENT_ANGLE * 0.4 // Roulette側と同スケール
    for (let winner = 0; winner < SEGMENT_COUNT; winner++) {
      for (const jitter of [-maxJitter, -1, 0, 1, maxJitter]) {
        const rotation = computeNextRotation({
          baseRotation: 1000,
          winnerIndex: winner,
          jitter,
          extraTurns: 5,
          segmentAngle: SEGMENT_ANGLE,
        })
        expect(resolveWinnerIndex(rotation, SEGMENT_COUNT)).toBe(winner)
      }
    }
  })

  test('常に baseRotation より前方(順方向)へ回転する', () => {
    const baseRotation = 500
    for (let winner = 0; winner < SEGMENT_COUNT; winner++) {
      const rotation = computeNextRotation({
        baseRotation,
        winnerIndex: winner,
        jitter: 0,
        extraTurns: 5,
        segmentAngle: SEGMENT_ANGLE,
      })
      expect(rotation).toBeGreaterThan(baseRotation)
    }
  })

  test('最低でも extraTurns 回転分は進む', () => {
    const baseRotation = 100
    const extraTurns = 5
    for (let winner = 0; winner < SEGMENT_COUNT; winner++) {
      const rotation = computeNextRotation({
        baseRotation,
        winnerIndex: winner,
        jitter: 0,
        extraTurns,
        segmentAngle: SEGMENT_ANGLE,
      })
      expect(rotation - baseRotation).toBeGreaterThanOrEqual(extraTurns * 360)
      // delta は (0, 360] の範囲
      expect(rotation - baseRotation).toBeLessThanOrEqual(
        extraTurns * 360 + 360
      )
    }
  })

  test('連続スピンでも毎回 winner と一致する', () => {
    let base = 0
    const winners = [0, 3, 7, 9, 2, 5]
    for (const w of winners) {
      const rotation = computeNextRotation({
        baseRotation: base,
        winnerIndex: w,
        jitter: 0,
        extraTurns: 5,
        segmentAngle: SEGMENT_ANGLE,
      })
      expect(resolveWinnerIndex(rotation, SEGMENT_COUNT)).toBe(w)
      expect(rotation).toBeGreaterThan(base)
      base = rotation
    }
  })
})

describe('resolveWinnerIndex', () => {
  test('rotation=0 のとき index 0 (segment[0] が真上)', () => {
    // winnerIndex=0 のセグメント中央角度は 18度。rotation=0 なら
    // ポインタ真上(0度)には境界(0度)が来ており、0度の直後の領域が segment 0。
    expect(resolveWinnerIndex(0, SEGMENT_COUNT)).toBe(0)
  })

  test('負の rotation も正しく正規化される', () => {
    // -342 ≡ 18 (mod 360)。盤が 18度 回った状態では、元の centerAngle=342 が
    // 0度付近に来ている → index 9
    expect(resolveWinnerIndex(-342, SEGMENT_COUNT)).toBe(9)
  })
})
