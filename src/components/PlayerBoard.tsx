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

export const PlayerBoard: React.FC<PlayerBoardProps> = ({
  playerId,
  currencyCounts,
  currencies,
  onUpdateCurrency,
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [playerName, setPlayerName] = useState(`プレイヤー ${playerId}`)

  const handleNameClick = () => {
    setIsEditing(true)
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerName(e.target.value)
  }

  const handleNameBlur = () => {
    setIsEditing(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setIsEditing(false)
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
        {isEditing ? (
          <input
            type="text"
            value={playerName}
            onChange={handleNameChange}
            onBlur={handleNameBlur}
            onKeyPress={handleKeyPress}
            autoFocus
            className="player-name-input"
          />
        ) : (
          <span className="player-name-display" onClick={handleNameClick}>
            {playerName}
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
