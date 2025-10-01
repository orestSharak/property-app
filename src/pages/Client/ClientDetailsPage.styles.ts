import styled from 'styled-components'

export const MainWrapper = styled.div`
  display: flex;
  gap: ${(p) => p.theme.spacing.max};
  flex-wrap: wrap;
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.spacing.xl};
  flex: 1;
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

export const NotesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.spacing.xl};
  margin-bottom: ${(p) => p.theme.spacing.xxl};
  margin-top: ${(p) => p.theme.spacing.sm};
`

export const TextAreaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: ${(p) => p.theme.spacing.xs};
`
