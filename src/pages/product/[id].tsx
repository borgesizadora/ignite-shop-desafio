import { useRouter } from 'next/router'

const ProductPage = () => {
  const { query } = useRouter()
  return <div>{JSON.stringify(query)}</div>
}

export default ProductPage
