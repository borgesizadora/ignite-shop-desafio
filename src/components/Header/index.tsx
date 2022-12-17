import Image from 'next/image'

import { Cart } from '~/components/Cart'
import { useCartContext } from '~/contexts/CartContext'
import { Header as HeaderContainer } from '~/styles/components/Header'
import { Handbag } from 'phosphor-react'

import * as Dialog from '@radix-ui/react-dialog'

import logoImg from '../../assets/logo.svg'

export const Header = () => {
  const { totalItemsInCart } = useCartContext()

  const shouldDisplayCartAmount = totalItemsInCart.amount > 0

  return (
    <HeaderContainer>
      <Image src={logoImg} alt="" />
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <div>
            <button type="button" title="Ver carrinho">
              <Handbag size={24} />
              {shouldDisplayCartAmount && <span>{totalItemsInCart.amount}</span>}
            </button>
          </div>
        </Dialog.Trigger>
        <Cart />
      </Dialog.Root>
    </HeaderContainer>
  )
}
