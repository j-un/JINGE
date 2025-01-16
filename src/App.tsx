import React, { useState } from 'react'
import { PlayerBoard } from './components/PlayerBoard'
import { usePlayerManagement } from './hooks/usePlayerManagement'
import { CURRENCIES, GAME_CONFIG } from './constants/gameConfig'
import styles from './App.module.css'

const App: React.FC = () => {
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
    <div className={styles.container}>
      <h1 className={styles.title}>JINGE - β Ver.</h1>
      <ul className={styles.description}>
        <li>タカラトミー「人生ゲーム」の紙幣管理をデジタル化</li>
        <li>ブラウザのみで動作するため、サーバーサイドにユーザーデータは一切保存しません</li>
      </ul>
      <div className={styles.playerControl}>
        <label htmlFor="playerCountInput">プレイヤー数 (1～6): </label>
        <input
          id="playerCountInput"
          type="number"
          value={playerCountInput}
          onChange={e => setPlayerCountInput(Number(e.target.value))}
          min={GAME_CONFIG.MIN_PLAYERS}
          max={GAME_CONFIG.MAX_PLAYERS}
          className={styles.playerInput}
        />
        <button onClick={handleSetPlayers}>リセット</button>
      </div>

      <p className={styles.description}>※プレイヤー名クリックで変更</p>
      <div className={styles.playerBoards}>
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

      <footer style={{
        marginTop: "40px",
        textAlign: "left",
        color: "#666",
        borderTop: "1px solid #eee",
        paddingTop: "20px"
      }}>
        <small>© {new Date().getFullYear()} JINGE. All rights reserved.</small>
      </footer>
    </div>
  )
}

export default App
