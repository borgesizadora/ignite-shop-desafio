import { styled } from '..'

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
    cursor: 'pointer',
    position: 'relative',
    span: {
      position: 'absolute',
      top: 0,
      right: 0,
      background: '$green500',
      width: '1.5rem',
      height: '1.5rem',
      borderRadius: '999px',
      color: '$white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 700,
      transform: 'translate(50%, -50%)'
    }
  }
})
