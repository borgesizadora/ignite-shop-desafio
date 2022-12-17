import { useState } from 'react'

import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { useCartContext } from '~/contexts/CartContext'
import { stripe } from '~/lib/stripe'
import { ImageContainer, ProductContainer, ProductDetails } from '~/styles/pages/product'
import { applyMoneyMask } from '~/utils/formatters'
import Stripe from 'stripe'

interface ProductProps {
  product: {
    id: string
    name: string
    imageUrl: string
    price: string
    description: string
    defaultPriceId: string
  }
}

export default function ProductPage({ product }: ProductProps) {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)
  const { addItemToCart } = useCartContext()
  async function handleByProduct() {
    addItemToCart({
      ...product
    })
    // try {
    //   setIsCreatingCheckoutSession(true)
    //   const response = await axios.post('/api/checkout', {
    //     priceId: product.defaultPriceId
    //   })

    //   const { checkoutUrl } = response.data

    //   window.location.href = checkoutUrl
    // } catch (error) {
    //   // Conectar com uma ferrramenta de observabilidade (Datalog / Sentry)

    //   setIsCreatingCheckoutSession(false)

    //   alert('Falha ao redirecionar ao checkout!')
    // }
  }

  const { isFallback } = useRouter()

  if (isFallback) return <p>Loading...</p>

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>
      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>
        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>
          <p>{product.description}</p>

          <button disabled={isCreatingCheckoutSession} onClick={handleByProduct}>
            Colocar na sacola
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: 'prod_MsyYo2wf1xCkq2' } }],
    fallback: true
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  const productId = params?.id || ''

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price']
  })

  const price = product.default_price as Stripe.Price
  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: applyMoneyMask(price.unit_amount ? price.unit_amount / 100 : 0),
        description: product.description,
        defaultPriceId: price.id
      }
    },
    revalidate: 60 * 60 * 1 // 1 hour
  }
}
