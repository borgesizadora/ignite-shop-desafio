import { createContext, ReactNode, useContext, useEffect, useReducer } from 'react'

import testJSON from '~/../test.json'
import { CartActions } from '~/reducers/cart/actions'
import { cartReducer } from '~/reducers/cart/reducer'
import { parseCookies, setCookie } from 'nookies'

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
  const { '@ignite-shop:items-in-cart-1.0.0': cartCookie } = parseCookies()

  const cart = cartCookie ? JSON.parse(cartCookie) : []
  console.log(cart)

  const [cartState, dispatch] = useReducer(cartReducer, {
    itemsInCart: [...cart]
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

  useEffect(() => {
    const cartJSON = JSON.stringify(itemsInCart)
    setCookie(null, '@ignite-shop:items-in-cart-1.0.0', cartJSON, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/'
    })
  }, [itemsInCart])

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
