import type { AppProps } from 'next/app'
import Image from 'next/image'

import { Cart } from '~/components/Cart'
import { globalStyles } from '~/styles/global'
import { Container, Header } from '~/styles/pages/app'
import { Handbag } from 'phosphor-react'

import * as Dialog from '@radix-ui/react-dialog'

import logoImg from '../assets/logo.svg'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Image src={logoImg} alt="" />
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button type="button" title="Ver carrinho">
              <Handbag size={24} />
            </button>
          </Dialog.Trigger>
          <Cart />
        </Dialog.Root>
      </Header>

      <Component {...pageProps} />
    </Container>
  )
}
