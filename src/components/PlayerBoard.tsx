import React, { useState } from 'react'
import { Currency } from '../types'

interface PlayerBoardProps {
  playerId: number
  currencyCounts: number[]
  currencies: Currency[]
  onUpdateCurrency: (
    playerId: number,
    currencyIndex: number,
    delta: number
  ) => void
}

type NameEdit =
  | { status: 'display'; name: string }
  | { status: 'editing'; name: string }

const focusAndSelectNameInput: React.RefCallback<HTMLInputElement> = input => {
  if (input === null) return
  input.focus()
  input.setSelectionRange(0, input.value.length)
}

export const PlayerBoard: React.FC<PlayerBoardProps> = ({
  playerId,
  currencyCounts,
  currencies,
  onUpdateCurrency,
}) => {
  const [nameEdit, setNameEdit] = useState<NameEdit>({
    status: 'display',
    name: `プレイヤー ${playerId}`,
  })

  const handleNameClick = () => {
    setNameEdit({ status: 'editing', name: nameEdit.name })
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameEdit({ status: 'editing', name: e.target.value })
  }

  const handleNameBlur = () => {
    setNameEdit({ status: 'display', name: nameEdit.name })
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setNameEdit({ status: 'display', name: nameEdit.name })
    }
  }

  const calculatePlayerTotal = (counts: number[]): number => {
    return counts.reduce(
      (sum, count, i) => sum + count * currencies[i].value,
      0
    )
  }

  const total = calculatePlayerTotal(currencyCounts)
  return (
    <div className="player-board">
      <h2 className="player-name">
        {nameEdit.status === 'editing' ? (
          <input
            type="text"
            value={nameEdit.name}
            onChange={handleNameChange}
            onBlur={handleNameBlur}
            onKeyPress={handleKeyPress}
            ref={focusAndSelectNameInput}
            className="player-name-input"
          />
        ) : (
          <span className="player-name-display" onClick={handleNameClick}>
            {nameEdit.name}
          </span>
        )}
      </h2>
      <p className="player-total">合計所持金: ${total.toLocaleString()}</p>
      {currencies.map((currency, index) => (
        <div key={currency.name} className="currency-row">
          <div className="currency-info">
            <div className="currency-amount">
              <img
                src={currency.img}
                alt={currency.name}
                className="currency-image"
              />
              <div className="currency-count">x {currencyCounts[index]}</div>
            </div>
            <div className="currency-controls">
              <button
                onClick={() => onUpdateCurrency(playerId, index, 1)}
                aria-label={`${currency.name}を増やす`}
                className="currency-button"
              >
                +
              </button>
              <button
                onClick={() => onUpdateCurrency(playerId, index, -1)}
                aria-label={`${currency.name}を減らす`}
                className="currency-button"
              >
                -
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
