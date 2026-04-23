export interface RotationParams {
  baseRotation: number
  winnerIndex: number
  jitter: number
  extraTurns: number
  segmentAngle: number
}

/**
 * ルーレット盤を時計回りに回転させたときに、winner セグメントの中央が
 * ポインター(真上・0度)の位置で止まる角度を算出する純関数。
 *
 * 前回の累積回転 `baseRotation` の mod 360 を考慮し、さらに `extraTurns` 分の
 * 360度回転を足すことで、常に順方向へ回り続けながら狙ったセグメントで止まる。
 */
export const computeNextRotation = ({
  baseRotation,
  winnerIndex,
  jitter,
  extraTurns,
  segmentAngle,
}: RotationParams): number => {
  const centerAngle = winnerIndex * segmentAngle + segmentAngle / 2
  const desiredMod = (((360 - centerAngle + jitter) % 360) + 360) % 360
  const currentMod = ((baseRotation % 360) + 360) % 360
  let delta = desiredMod - currentMod
  if (delta <= 0) delta += 360
  return baseRotation + extraTurns * 360 + delta
}

/**
 * 指定した回転角が適用されたときに、ポインター(0度)位置に来るセグメントの
 * インデックスを逆算する純関数。テストでの整合性検証に使う。
 */
export const resolveWinnerIndex = (
  rotation: number,
  segmentCount: number
): number => {
  const segmentAngle = 360 / segmentCount
  const normalized = ((rotation % 360) + 360) % 360
  // 盤が `normalized` 時計回りに回った結果、真上に来ているセグメントの
  // 元の中心角度は (360 - normalized) mod 360。それに対応する index を返す。
  const centerAngle = (360 - normalized + 360) % 360
  return Math.floor(centerAngle / segmentAngle)
}
