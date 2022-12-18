import { useState } from 'react'

import Image from 'next/image'

import { useCartContext } from '~/contexts/CartContext'
import {
  CartContainer,
  CartItem,
  CartItemImg,
  CartItemsAmount,
  CartTotal,
  CloseButton,
  EmptyCart,
  ItemsContainer,
  RemoveItemButton
} from '~/styles/components/Cart'
import axios from 'axios'
import { X } from 'phosphor-react'

import * as Dialog from '@radix-ui/react-dialog'

export const Cart = () => {
  const { itemsInCart, totalItemsInCart } = useCartContext()
  const { removeItemFromCart } = useCartContext()
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)
  const { clearCart } = useCartContext()
  const handleBuyProducts = async () => {
    try {
      if (itemsInCart.length === 0) return
      setIsCreatingCheckoutSession(true)
      const response = await axios.post('/api/checkout', {
        itemsInCart: itemsInCart.map((item) => ({
          price: item.defaultPriceId,
          quantity: 1
        }))
      })

      const { checkoutUrl } = response.data
      clearCart()

      window.location.href = checkoutUrl
    } catch (error) {
      setIsCreatingCheckoutSession(false)
    }
  }
  const shouldDisableSubmitButton = isCreatingCheckoutSession || itemsInCart?.length === 0

  return (
    <Dialog.Portal>
      <CartContainer>
        <CloseButton>
          <X size={24} />
        </CloseButton>
        <ItemsContainer>
          <Dialog.Title>Sacola de compras</Dialog.Title>

          {itemsInCart?.length > 0 &&
            itemsInCart.map((item) => (
              <CartItem key={item.id}>
                <CartItemImg>
                  <Image src={item.imageUrl} width={100} height={100} alt="" />
                </CartItemImg>
                <div>
                  {item.name}
                  <span>{item.price}</span>
                  <RemoveItemButton type="button" onClick={() => removeItemFromCart(item.id)}>
                    Remover
                  </RemoveItemButton>
                </div>
              </CartItem>
            ))}
        </ItemsContainer>
        {itemsInCart?.length === 0 && <EmptyCart>Carrinho vazio</EmptyCart>}

        <footer>
          {itemsInCart?.length > 0 && (
            <>
              <CartItemsAmount>
                Quantidade <span>{totalItemsInCart.amount} itens</span>
              </CartItemsAmount>
              <CartTotal>
                Valor total <span>{totalItemsInCart.priceTotal}</span>
              </CartTotal>
            </>
          )}
          <button type="button" onClick={handleBuyProducts} disabled={shouldDisableSubmitButton}>
            Finalizar compra
          </button>
        </footer>
      </CartContainer>
    </Dialog.Portal>
  )
}
