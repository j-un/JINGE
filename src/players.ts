import { Currency, Player } from './types'

export function createPlayers(
  count: number,
  denominationCount: number
): Player[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    currencyCounts: Array.from({ length: denominationCount }, () => 0),
  }))
}

export function resetPlayers(
  count: number,
  denominationCount: number,
  min: number,
  max: number
): Player[] {
  const validCount = Math.min(Math.max(count, min), max)
  return createPlayers(validCount, denominationCount)
}

export function adjustCount(
  players: Player[],
  playerId: number,
  currencyIndex: number,
  delta: number
): Player[] {
  return players.map(player => {
    if (player.id !== playerId) return player
    const currencyCounts = [...player.currencyCounts]
    const next = currencyCounts[currencyIndex] + delta
    currencyCounts[currencyIndex] = Math.min(99, Math.max(0, next))
    return { ...player, currencyCounts }
  })
}

export function playerTotal(counts: number[], currencies: Currency[]): number {
  return counts.reduce(
    (sum, count, index) => sum + count * currencies[index].value,
    0
  )
}
