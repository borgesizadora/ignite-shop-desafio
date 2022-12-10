import Image from 'next/image'

import { Cart } from '~/components/Cart'
import { useCartContext } from '~/contexts/CartContext'
import { Header as HeaderContainer } from '~/styles/components/Header'
import { Handbag } from 'phosphor-react'

import * as Dialog from '@radix-ui/react-dialog'

import logoImg from '../../assets/logo.svg'

export const Header = () => {
  const { totalItemsInCart } = useCartContext()

  return (
    <HeaderContainer>
      <Image src={logoImg} alt="" />
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button type="button" title="Ver carrinho">
            <Handbag size={24} />
            {totalItemsInCart > 0 && <span>{totalItemsInCart}</span>}
          </button>
        </Dialog.Trigger>
        <Cart />
      </Dialog.Root>
    </HeaderContainer>
  )
}
