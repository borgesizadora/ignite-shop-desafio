import { CartItemType } from './../../contexts/CartContext'
import { CartActions, CartActionsType } from './actions'

interface CartState {
  itemsInCart: CartItemType[]
}

export function cartReducer(state: CartState, action: CartActionsType) {
  if (action.type === CartActions.ADD_ITEM_TO_CART) {
    const oldItems = state.itemsInCart
    if (oldItems.find((item) => item.id === action.payload.item.id)) return state
    const newItems = [...oldItems, action.payload.item]
    return {
      ...state,
      itemsInCart: newItems
    }
  }
  if (action.type === CartActions.REMOVE_ITEM_FROM_CART) {
    const filteredItems = state.itemsInCart.filter((item) => item.id !== action.payload.itemId)
    return { ...state, itemsInCart: filteredItems }
  }

  return state
}
