import React, { useState, useRef } from 'react'
import { computeNextRotation } from './rouletteMath'

const SEGMENTS = [
  { number: 1, color: '#E53935' },
  { number: 2, color: '#FDD835' },
  { number: 3, color: '#1E88E5' },
  { number: 4, color: '#43A047' },
  { number: 5, color: '#FB8C00' },
  { number: 6, color: '#8E24AA' },
  { number: 7, color: '#00ACC1' },
  { number: 8, color: '#F06292' },
  { number: 9, color: '#FFFFFF' },
  { number: 10, color: '#6D4C41' },
]

const SEGMENT_COUNT = SEGMENTS.length
const SEGMENT_ANGLE = 360 / SEGMENT_COUNT
const SPIN_DURATION_MS = 4000

const polar = (cx: number, cy: number, r: number, deg: number) => {
  const rad = ((deg - 90) * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

const segmentPath = (i: number): string => {
  const cx = 100
  const cy = 100
  const r = 95
  const start = i * SEGMENT_ANGLE
  const end = start + SEGMENT_ANGLE
  const p1 = polar(cx, cy, r, start)
  const p2 = polar(cx, cy, r, end)
  return `M ${cx} ${cy} L ${p1.x} ${p1.y} A ${r} ${r} 0 0 1 ${p2.x} ${p2.y} Z`
}

const labelPosition = (i: number) => {
  const mid = i * SEGMENT_ANGLE + SEGMENT_ANGLE / 2
  return polar(100, 100, 75, mid)
}

export const Roulette: React.FC = () => {
  const [rotation, setRotation] = useState(0)
  const [spinning, setSpinning] = useState(false)
  const [result, setResult] = useState<number | null>(null)
  const baseRotation = useRef(0)

  const handleSpin = () => {
    if (spinning) return
    setSpinning(true)
    setResult(null)

    const winner = Math.floor(Math.random() * SEGMENT_COUNT)
    const extraTurns = 5 + Math.floor(Math.random() * 3)
    // セグメント内のランダムな位置（中心±40%の範囲で境界から離す）
    const jitter = (Math.random() - 0.5) * SEGMENT_ANGLE * 0.8
    const targetRotation = computeNextRotation({
      baseRotation: baseRotation.current,
      winnerIndex: winner,
      jitter,
      extraTurns,
      segmentAngle: SEGMENT_ANGLE,
    })

    baseRotation.current = targetRotation
    setRotation(targetRotation)

    window.setTimeout(() => {
      setSpinning(false)
      setResult(SEGMENTS[winner].number)
    }, SPIN_DURATION_MS)
  }

  return (
    <div className="roulette-wrapper">
      <div className="roulette-stage">
        <div className="roulette-pointer" aria-hidden="true" />
        <svg
          viewBox="0 0 200 200"
          className="roulette-disc"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: spinning
              ? `transform ${SPIN_DURATION_MS}ms cubic-bezier(0.17, 0.67, 0.18, 1)`
              : 'none',
          }}
          role="img"
          aria-label="人生ゲーム風ルーレット"
        >
          <circle cx="100" cy="100" r="98" fill="#222" />
          {SEGMENTS.map((seg, i) => {
            const { x, y } = labelPosition(i)
            const textColor = seg.color === '#FFFFFF' ? '#222' : '#fff'
            return (
              <g key={i}>
                <path
                  d={segmentPath(i)}
                  fill={seg.color}
                  stroke="#222"
                  strokeWidth="1"
                />
                <text
                  x={x}
                  y={y}
                  fill={textColor}
                  fontSize="18"
                  fontWeight="bold"
                  textAnchor="middle"
                  dominantBaseline="central"
                  transform={`rotate(${i * SEGMENT_ANGLE + SEGMENT_ANGLE / 2}, ${x}, ${y})`}
                >
                  {seg.number}
                </text>
              </g>
            )
          })}
          <circle
            cx="100"
            cy="100"
            r="50"
            fill="#fff"
            stroke="#222"
            strokeWidth="2"
          />
          <circle cx="100" cy="100" r="6" fill="#222" />
        </svg>
      </div>

      <div className="roulette-controls">
        <button
          type="button"
          onClick={handleSpin}
          disabled={spinning}
          className="roulette-spin-button"
        >
          {spinning ? '回転中…' : 'ルーレットを回す'}
        </button>
        <div className="roulette-result" aria-live="polite">
          {result !== null ? `結果: ${result}` : spinning ? '…' : ' '}
        </div>
      </div>
    </div>
  )
}

export default Roulette
