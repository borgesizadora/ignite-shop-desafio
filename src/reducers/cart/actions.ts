import { CartItemType } from './../../contexts/CartContext'
export enum CartActions {
  REMOVE_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_CART',
  ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART'
}
export type CartActionsType =
  | {
      type: CartActions.REMOVE_ITEM_FROM_CART
      payload: {
        itemId: string
      }
    }
  | {
      type: CartActions.ADD_ITEM_TO_CART
      payload: {
        item: CartItemType
      }
    }
