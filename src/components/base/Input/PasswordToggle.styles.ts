import styled from 'styled-components'

export const StyledButton = styled.button`
  background: none;
  border-color: transparent;
  cursor: pointer;
  padding: 0;
  margin: 0;
  border-radius: ${(p) => p.theme.radius.round};
  display: flex;
  align-items: center;
  transition: all 0.2s;

  &:hover {
    opacity: 0.7;
    border-color: transparent;
  }

  &:focus-visible {
    border-color: ${(p) => p.theme.colors.boxShadowInfo};
    box-shadow: 0 0 0 2px ${(p) => p.theme.colors.boxShadowInfo};
    outline: none;
  }
`
