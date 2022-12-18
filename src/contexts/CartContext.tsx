import { createContext, ReactNode, useContext, useEffect, useReducer, useState } from 'react'

import { CartActions } from '~/reducers/cart/actions'
import { cartReducer } from '~/reducers/cart/reducer'
import { applyMoneyMask, removeMoneyMask } from '~/utils/formatters'
import { parseCookies, setCookie } from 'nookies'

interface ICartContextProvider {
  children: ReactNode
}

export interface CartItemType {
  id: string
  imageUrl: string
  name: string
  price: string
  defaultPriceId: string
}

interface CartContextType {
  itemsInCart: CartItemType[]
  addItemToCart: (item: CartItemType) => void
  removeItemFromCart: (id: string) => void
  clearCart: () => void
  totalItemsInCart: {
    amount: number
    priceTotal: string
  }
}

const CartContext = createContext({} as CartContextType)

export const CartContextProvider = ({ children }: ICartContextProvider) => {
  const { '@ignite-shop:items-in-cart-1.0.0': cartCookie } = parseCookies()
  const cartItemsInitialValues = (cartCookie ? JSON.parse(cartCookie) : []) as CartItemType[]
  const [totalItemsInCart, setTotalItemsInCart] = useState<CartContextType['totalItemsInCart']>({
    amount: 0,
    priceTotal: 'R$ 0,00'
  })

  const [cartState, dispatch] = useReducer(cartReducer, {
    itemsInCart: [...cartItemsInitialValues]
  })
  const { itemsInCart } = cartState

  function addItemToCart(item: CartItemType) {
    dispatch({ type: CartActions.ADD_ITEM_TO_CART, payload: { item: item } })
  }

  function removeItemFromCart(id: string) {
    dispatch({ type: CartActions.REMOVE_ITEM_FROM_CART, payload: { itemId: id } })
  }

  function clearCart() {
    dispatch({ type: CartActions.CLEAR_CART })
  }

  useEffect(() => {
    const cartJSON = JSON.stringify(itemsInCart)
    setCookie(null, '@ignite-shop:items-in-cart-1.0.0', cartJSON, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/'
    })
    setTotalItemsInCart({
      amount: itemsInCart.reduce((total) => {
        return (total += 1)
      }, 0),
      priceTotal: applyMoneyMask(
        itemsInCart.reduce((total, item) => {
          const itemPrice = removeMoneyMask(item.price)
          return (total += itemPrice)
        }, 0)
      )
    })
  }, [itemsInCart])

  return (
    <CartContext.Provider
      value={{
        itemsInCart,
        addItemToCart,
        removeItemFromCart,
        clearCart,
        totalItemsInCart
      }}>
      {children}
    </CartContext.Provider>
  )
}
export const useCartContext = () => useContext(CartContext)
