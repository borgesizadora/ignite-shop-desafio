import { createContext, ReactNode, useContext, useReducer } from 'react'

import { CartActions } from '~/reducers/cart/actions'
import { cartReducer } from '~/reducers/cart/reducer'

interface ICartContextProvider {
  children: ReactNode
}

export interface CartItemType {
  id: string
  imageUrl: string
  name: string
  price: string
}

interface CartContextType {
  itemsInCart: CartItemType[]
  addItemToCart: (item: CartItemType) => void
  removeItemFromCart: (id: string) => void
  totalItemsInCart: number
}

const CartContext = createContext({} as CartContextType)

export const CartContextProvider = ({ children }: ICartContextProvider) => {
  const [cartState, dispatch] = useReducer(cartReducer, {
    itemsInCart: []
  })
  const { itemsInCart } = cartState

  function addItemToCart(item: CartItemType) {
    dispatch({ type: CartActions.ADD_ITEM_TO_CART, payload: { item: item } })
  }

  function removeItemFromCart(id: string) {
    dispatch({ type: CartActions.REMOVE_ITEM_FROM_CART, payload: { itemId: id } })
  }
  const totalItemsInCart = itemsInCart.reduce((total, item) => {
    return (total += 1)
  }, 0)

  return (
    <CartContext.Provider
      value={{
        itemsInCart,
        addItemToCart,
        removeItemFromCart,
        totalItemsInCart
      }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCartContext = () => useContext(CartContext)
