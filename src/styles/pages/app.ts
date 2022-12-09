import { styled } from '..'

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  minHeight: '100vh',
  justifyContent: 'center'
})

export const Header = styled('header', {
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'space-between',
  button: {
    padding: '0.75rem',
    borderRadius: '6px',
    lineHeight: 0,
    border: 0,
    background: '$gray800',
    color: '$gray300',
    cursor: 'pointer'
  }
})
