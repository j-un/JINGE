import { useState } from 'react'
import { GAME_CONFIG } from '../constants/gameConfig'
import { adjustCount, createPlayers, resetPlayers } from '../players'
import { Currency, Player } from '../types'

interface UsePlayerManagementProps {
  initialPlayerCount: number
  currencies: Currency[]
}

export const usePlayerManagement = ({
  initialPlayerCount,
  currencies,
}: UsePlayerManagementProps) => {
  const [players, setPlayers] = useState<Player[]>(
    createPlayers(initialPlayerCount, currencies.length)
  )

  const updatePlayerCount = (newCount: number) => {
    setPlayers(
      resetPlayers(
        newCount,
        currencies.length,
        GAME_CONFIG.MIN_PLAYERS,
        GAME_CONFIG.MAX_PLAYERS
      )
    )
  }

  const updateCurrencyCount = (
    playerId: number,
    currencyIndex: number,
    delta: number
  ) => {
    setPlayers(prev => adjustCount(prev, playerId, currencyIndex, delta))
  }

  return {
    players,
    updatePlayerCount,
    updateCurrencyCount,
  }
}
