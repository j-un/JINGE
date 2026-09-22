export function formatPlayerTotalLine(
  total: number,
  areTotalsVisible: boolean
): string {
  if (areTotalsVisible) {
    return `合計所持金: $${total.toLocaleString()}`
  }
  return '合計所持金: $---'
}

export function totalsVisibilityButtonLabel(
  areTotalsVisible: boolean
): '合計を隠す' | '合計を表示' {
  return areTotalsVisible ? '合計を隠す' : '合計を表示'
}
