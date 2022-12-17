export const removeMoneyMask = (value: string) => {
  const regex = /[^\d.,]/g
  return Number(value.replaceAll(regex, '').replace(',', '.'))
}

export const applyMoneyMask = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}
