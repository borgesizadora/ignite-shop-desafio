import React from 'react'

import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import { stripe } from '~/lib/stripe'
import { ImageContainer, ProductsListContainer, SuccessContainer } from '~/styles/pages/success'
import Stripe from 'stripe'

interface SuccessProps {
  customerName: string
  products: {
    name: string
    imageUrl: string
  }[]
}
const Success = ({ customerName, products }: SuccessProps) => {
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>

        <meta name="robots" content="noindex" />
      </Head>
      <SuccessContainer>
        <h1>Compra efetuada!</h1>
        <ProductsListContainer>
          {products.map((product) => (
            <ImageContainer key={product.name}>
              <Image src={product.imageUrl} width={120} height={110} alt="" />
            </ImageContainer>
          ))}
        </ProductsListContainer>
        <p>
          Uhuul
          <strong> {customerName}</strong>, sua compra de
          <span> {products.length} </span>
          {products.length === 1 ? 'camiseta ' : 'camisetas '}
          já está a caminho da sua casa.
        </p>
        <Link href="/">Voltar ao catálogo</Link>
      </SuccessContainer>
    </>
  )
}

export default Success

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const sessionId = String(query.session_id)

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  })

  const customerName = session.customer_details?.name

  const products = session?.line_items?.data.map((product) => {
    const item = product?.price?.product as Stripe.Product
    return {
      name: item.name,
      imageUrl: item.images[0]
    }
  })

  return {
    props: {
      customerName,
      products
    }
  }
}
