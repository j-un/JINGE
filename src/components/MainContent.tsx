import React, { useState } from 'react'
import { PlayerBoard } from './PlayerBoard'
import { usePlayerManagement } from '../hooks/usePlayerManagement'
import { CURRENCIES, GAME_CONFIG } from '../constants/gameConfig'

export const MainContent: React.FC = () => {
  const [playerCountInput, setPlayerCountInput] = useState<number>(
    GAME_CONFIG.INITIAL_PLAYER_COUNT
  )
  const { players, updatePlayerCount, updateCurrencyCount } =
    usePlayerManagement({
      initialPlayerCount: GAME_CONFIG.INITIAL_PLAYER_COUNT,
      currencies: CURRENCIES,
    })

  const handleSetPlayers = () => {
    updatePlayerCount(playerCountInput)
  }

  return (
    <>
      <ul className="main-description">
        <li>タカラトミー「人生ゲーム」の紙幣管理をデジタル化</li>
        <li>
          ブラウザのみで動作するため、サーバーサイドにユーザーデータは一切保存しません
        </li>
      </ul>
      
      <div className="player-control">
        <label htmlFor="playerCountInput">プレイヤー数 (1～6): </label>
        <input
          id="playerCountInput"
          type="number"
          value={playerCountInput}
          onChange={e => setPlayerCountInput(Number(e.target.value))}
          min={GAME_CONFIG.MIN_PLAYERS}
          max={GAME_CONFIG.MAX_PLAYERS}
          className="player-count-input"
        />
        <button 
          onClick={handleSetPlayers}
          className="reset-button"
        >
          リセット
        </button>
      </div>

      <p className="player-name-hint">※プレイヤー名クリックで変更</p>
      
      <div className="player-board-grid">
        {players.map(player => (
          <PlayerBoard
            key={player.id}
            playerId={player.id}
            currencyCounts={player.currencyCounts}
            currencies={CURRENCIES}
            onUpdateCurrency={updateCurrencyCount}
          />
        ))}
      </div>
    </>
  )
}
export default MainContent
