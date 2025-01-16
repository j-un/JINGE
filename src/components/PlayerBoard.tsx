import React, { useState } from 'react'
import { Currency } from '../types'
import styles from './PlayerBoard.module.css'

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
    <div className={styles.playerBoard}>
      <h2 className={styles.playerName}>
        {isEditing ? (
          <input
            type="text"
            value={playerName}
            onChange={handleNameChange}
            onBlur={handleNameBlur}
            onKeyPress={handleKeyPress}
            autoFocus
            className={styles.nameInput}
          />
        ) : (
          <span onClick={handleNameClick}>{playerName}</span>
        )}
      </h2>
      <p className={styles.totalAmount}>
        合計所持金: ${total.toLocaleString()}
      </p>
      {currencies.map((currency, index) => (
        <div key={currency.name} className={styles.currencyItem}>
          <div className={styles.currencyContainer}>
            <img
              src={currency.img}
              alt={currency.name}
              className={styles.currencyImage}
            />
            <div className={styles.currencyCount}>
              x {currencyCounts[index]}
            </div>
            <div className={styles.buttonContainer}>
              <button
                onClick={() => onUpdateCurrency(playerId, index, 1)}
                aria-label={`${currency.name}を増やす`}
                className={styles.currencyButton}
              >
                +
              </button>
              <button
                onClick={() => onUpdateCurrency(playerId, index, -1)}
                aria-label={`${currency.name}を減らす`}
                className={styles.currencyButton}
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
