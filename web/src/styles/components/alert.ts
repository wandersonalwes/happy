import styled from 'styled-components'

export const Container = styled.div`
  position: absolute;
  top: 40px;
  right: 40px;
  padding: 20px;
  background: #37c77f;
  border-radius: 20px;
  overflow: hidden;
  z-index: 10;

  span {
    position: absolute;
    left: 0;
    bottom: 0;
    display: block;
    background: #0b904c;
    height: 5px;
    animation: progressBarAlert 4s ease-in;
  }

  @keyframes progressBarAlert {
    0% {
      width: 0%;
    }
    100% {
      width: 100%;
    }
  }
`
