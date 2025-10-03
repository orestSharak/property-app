import styled, { keyframes } from 'styled-components'

// no theme props in purpose
const colorCycle = keyframes`
  0% {
    background-color: black;
  }
  33% {
    background-color: #F011D6;
  }
  66% {
    background-color: #00CFFF;
  }
  100% {
    background-color: black;
  }
`

export const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`

export const AnimatedCircle = styled.div`
  width: 50px;
  height: 50px;

  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${colorCycle} 0.5s infinite alternate;
`

export const AnimatedHouseSVG = styled.svg`
  width: 50%;
  height: 50%;
`
