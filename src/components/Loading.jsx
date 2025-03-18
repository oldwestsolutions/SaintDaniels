import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
`

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid var(--light-tan);
  border-top: 5px solid var(--gold);
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`

export default function Loading() {
  return (
    <LoadingWrapper>
      <Spinner />
    </LoadingWrapper>
  )
} 