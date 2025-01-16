export interface Currency {
  name: string
  value: number
  img: string
}

export interface Player {
  id: number
  currencyCounts: number[]
}
