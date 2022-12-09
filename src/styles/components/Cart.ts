import { styled } from '..'

import * as Dialog from '@radix-ui/react-dialog'
import { keyframes } from '@stitches/react'

const contentShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 }
})

export const CartContainer = styled(Dialog.Content, {
  position: 'absolute',
  right: 0,
  top: 0,
  height: '100vh',
  background: '$gray800',
  width: '30rem',
  boxShadow: '-4px 0px 30px rgba(0, 0, 0, 0.8)',
  padding: '3rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  transition: 'all 300ms',
  animation: `${contentShow} 200ms`,

  'footer button': {
    background: '$green500',
    font: 'inherit',
    color: '$white',
    fontWeight: 700,
    padding: '1.25rem 0',
    width: '100%',
    border: 0,
    borderRadius: 8
  }
})

export const CloseButton = styled(Dialog.Close, {
  position: 'absolute',
  background: 'transparent',
  border: 0,
  top: '1.5rem',
  right: '1.5rem',
  lineHeight: 0,
  cursor: 'pointer',
  color: '$gray300'
})

export const ItemsContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
  h2: {
    fontSize: '1.25rem'
  }
})

export const CartItem = styled('div', {
  display: 'flex',
  gap: '1.25rem',
  '& > div': {
    display: 'flex',
    padding: '0.5rem 0',
    flexDirection: 'column',
    justifyContent: 'space-between'
  }
})

export const RemoveItemButton = styled('button', {
  background: 'transparent',
  color: '$green500',
  border: 0,
  fontWeight: 700,
  fontSize: '1rem',
  cursor: 'pointer',
  width: 'fit-content'
})

export const CartItemImg = styled('div', {
  width: '100%',
  maxWidth: 100,
  height: 100,
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  padding: '0.25rem',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover'
  }
})

export const CartItemsAmount = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '0.5rem',
  color: '$gray300',
  span: {
    fontSize: '1.25rem'
  }
})

export const CartTotal = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  color: '$gray100',
  marginBottom: '3.5rem',
  fontSize: '1.25rem',
  fontWeight: 700,
  span: {
    fontSize: '1.5rem'
  }
})
