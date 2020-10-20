import styled from 'styled-components'

export const MyButton = styled.button`
  &:not(:disabled) {
    cursor: pointer;
  }

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 700;
  width: 100%;
  height: 64px;
  border: 0;
  border-radius: 20px;
  margin-top: 24px;
  color: #fff;

  transition: 0.2s;

  &:disabled {
    opacity: 0.5;
  }

  &.success {
    background: #37c77f;
  }
  &.success:hover:not(:disabled) {
    background: #3ee08f;
  }

  .loader,
  .loader:after {
    border-radius: 50%;
    width: 24px;
    height: 24px;
  }

  .loader {
    display: block;
    font-size: 5px;
    position: relative;
    text-indent: -9999em;
    border-top: 1.1em solid rgba(0, 0, 0, 0.1);
    border-right: 1.1em solid rgba(0, 0, 0, 0.1);
    border-bottom: 1.1em solid rgba(0, 0, 0, 0.1);
    border-left: 1.1em solid #fff;
    border-radius: 50%;
    transform: translateZ(0);
    animation: load8 1.1s infinite linear;
  }
  @keyframes load8 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`
