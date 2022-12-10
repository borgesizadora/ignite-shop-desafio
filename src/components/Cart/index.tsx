import Image from 'next/image'

import { useCartContext } from '~/contexts/CartContext'
import {
  CartContainer,
  CartItem,
  CartItemImg,
  CartItemsAmount,
  CartTotal,
  CloseButton,
  ItemsContainer,
  RemoveItemButton
} from '~/styles/components/Cart'
import { X } from 'phosphor-react'

import * as Dialog from '@radix-ui/react-dialog'

export const Cart = () => {
  const { itemsInCart, totalItemsInCart } = useCartContext()
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
                  <RemoveItemButton type="button">Remover</RemoveItemButton>
                </div>
              </CartItem>
            ))}
        </ItemsContainer>

        <footer>
          <CartItemsAmount>
            Quantidade <span>{totalItemsInCart} itens</span>
          </CartItemsAmount>
          <CartTotal>
            Valor total <span>R$ 270,00</span>
          </CartTotal>
          <button type="button">Finalizar compra</button>
        </footer>
      </CartContainer>
    </Dialog.Portal>
  )
}
