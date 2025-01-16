import { useState } from 'react'
import { Player, Currency } from '../types'

interface UsePlayerManagementProps {
  initialPlayerCount: number
  currencies: Currency[]
}

export const usePlayerManagement = ({
  initialPlayerCount,
  currencies,
}: UsePlayerManagementProps) => {
  const createInitialPlayers = (count: number): Player[] => {
    return Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      currencyCounts: currencies.map(() => 0),
    }))
  }

  const [players, setPlayers] = useState<Player[]>(
    createInitialPlayers(initialPlayerCount)
  )

  const updatePlayerCount = (newCount: number) => {
    const validCount = Math.min(Math.max(newCount, 1), 6)
    setPlayers(createInitialPlayers(validCount))
  }

  const updateCurrencyCount = (
    playerId: number,
    currencyIndex: number,
    delta: number
  ) => {
    setPlayers(prev =>
      prev.map(p => {
        if (p.id !== playerId) return p
        const newCounts = [...p.currencyCounts]
        const newVal = newCounts[currencyIndex] + delta
        newCounts[currencyIndex] = Math.min(99, Math.max(0, newVal))
        return { ...p, currencyCounts: newCounts }
      })
    )
  }

  const calculatePlayerTotal = (currencyCounts: number[]): number => {
    return currencyCounts.reduce(
      (sum, count, i) => sum + count * currencies[i].value,
      0
    )
  }

  return {
    players,
    updatePlayerCount,
    updateCurrencyCount,
    calculatePlayerTotal,
  }
}
