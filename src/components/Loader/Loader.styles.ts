import styled, { keyframes } from 'styled-components'

// no theme props in purpose
const colorCycle = keyframes`
  0% {
    background-color: #F011D6;
    transform: scale(0.8,0.8);
  }
  
  50% {
    background-color: #00CFFF;
    transform: scale(1,1);
  }
  
  100% {
    background-color: #F011D6;
    transform: scale(0.8,0.8);
  }
`

export const SpinnerContainer = styled.div<{ $height?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: ${({ $height }) => ($height ? $height : '100vh')};
  background-color: transparent;
`

export const AnimatedCircle = styled.div`
  width: 50px;
  height: 50px;

  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${colorCycle} 0.8s infinite alternate;
`

export const AnimatedHouseSVG = styled.svg`
  width: 50%;
  height: 50%;
`
