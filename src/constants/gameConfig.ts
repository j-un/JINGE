import { Currency } from '../types'
import bill1000 from '../assets/images/1000.webp'
import bill5000 from '../assets/images/5000.webp'
import bill10000 from '../assets/images/10000.webp'
import bill20000 from '../assets/images/20000.webp'
import bill50000 from '../assets/images/50000.webp'
import bill100000 from '../assets/images/100000.webp'
import billyakusoku from '../assets/images/yakusoku.webp'
import billseimei from '../assets/images/seimei.webp'
import billkabu from '../assets/images/kabu.webp'
import billkasai from '../assets/images/kasai.webp'
import billjidousha from '../assets/images/jidousha.webp'

export const CURRENCIES: Currency[] = [
  { name: '$1000', value: 1000, img: bill1000 },
  { name: '$5000', value: 5000, img: bill5000 },
  { name: '$10000', value: 10000, img: bill10000 },
  { name: '$20000', value: 20000, img: bill20000 },
  { name: '$50000', value: 50000, img: bill50000 },
  { name: '$100000', value: 100000, img: bill100000 },
  { name: '$20000約束手形', value: 0, img: billyakusoku },
  { name: '生命保険証', value: 0, img: billseimei },
  { name: '株券', value: 0, img: billkabu },
  { name: '火災保険', value: 0, img: billkasai },
  { name: '自動車保険', value: 0, img: billjidousha },
]

export const GAME_CONFIG = {
  MIN_PLAYERS: 1,
  MAX_PLAYERS: 6,
  INITIAL_PLAYER_COUNT: 1,
}
