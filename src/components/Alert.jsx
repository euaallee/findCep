import React from 'react'
import styled from 'styled-components'

const AlertBox = styled.div`
  width: 100vw;
  padding: 1rem 0 1rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: red;
  color: white;
  position: fixed;
  top: 0rem;
  animation: rotate .2s linear;
`
const P = styled.p`
  font-size: 2.4rem;
  text-transform: capitalize;
  font-weight: bold;
`

export default function Alert({children}) {
  return (
    <AlertBox>
      <P>
        {children}
      </P>
    </AlertBox>
  )
}
