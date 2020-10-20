import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  label {
    font-size: 16px;
    font-weight: 500;
    color: #8fa7b2;
    margin-bottom: 8px;
  }

  input {
    color: #5c8599;
    background: #f5f8fa;
    border: 1px solid #d3e2e5;
    border-radius: 20px;
    width: 100%;
    height: 64px;
    padding: 0 25px;
  }

  & + div {
    margin-top: 16px;
  }
`
