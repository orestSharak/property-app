import styled from 'styled-components'

export const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.spacing.xxxl};
`

export const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${(p) => p.theme.spacing.max};
`

export const Container = styled.div`
  flex: 1;
  min-width: 465px;
  max-width: 500px;
  margin-bottom: ${(p) => p.theme.spacing.xl};
`

export const HeaderSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.spacing.md};
  margin-bottom: ${(p) => p.theme.spacing.xl};
`

export const ButtonSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.spacing.sm};
  margin-left: auto;
`
export const CardWrapper = styled.div`
  flex: 1;
  min-width: 370px;
`

export const NotesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.spacing.xl};
  margin-bottom: ${(p) => p.theme.spacing.xxl};
`

export const TextAreaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: ${(p) => p.theme.spacing.xs};
`
