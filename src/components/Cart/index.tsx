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
  return (
    <Dialog.Portal>
      <CartContainer>
        <CloseButton>
          <X size={24} />
        </CloseButton>
        <ItemsContainer>
          <Dialog.Title>
            <h2>Sacola de compras</h2>
          </Dialog.Title>

          <CartItem>
            <CartItemImg />
            <div>
              Camiseta Beyond the Limits
              <span>R$ 79,90</span>
              <RemoveItemButton type="button">Remover</RemoveItemButton>
            </div>
          </CartItem>
          <CartItem>
            <CartItemImg />
            <div>
              Camiseta Beyond the Limits
              <span>R$ 79,90</span>
              <RemoveItemButton type="button">Remover</RemoveItemButton>
            </div>
          </CartItem>
          <CartItem>
            <CartItemImg />
            <div>
              Camiseta Beyond the Limits
              <span>R$ 79,90</span>
              <RemoveItemButton type="button">Remover</RemoveItemButton>
            </div>
          </CartItem>
        </ItemsContainer>

        <footer>
          <CartItemsAmount>
            Quantidade <span>3 itens</span>
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
