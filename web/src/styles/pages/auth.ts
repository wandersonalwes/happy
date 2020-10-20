import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: stretch;

  width: 100vw;
  height: 100vh;
  background: linear-gradient(329.54deg, #29b6d1 0%, #00c7c7 100%);
`

export const Form = styled.form`
  position: relative;
  width: 100%;
  max-width: 520px;
  background: #fff;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  padding: 80px;

  .go-back {
    position: absolute;
    top: 40px;
    right: 40px;

    width: 48px;
    height: 48px;
    background: #ebf2f5;
    border-radius: 16px;

    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.2s;

    &:hover {
      background: #d1edf2;
    }
  }

  .options-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    .remember-password,
    .forgot-password {
      color: #8fa7b2;
    }

    .forgot-password:hover {
      color: #15c3d6;
    }
    .remember-password {
      display: block;
      position: relative;
      padding-left: 34px;

      .checkmark {
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        width: 24px;
        height: 24px;
        border: 1px solid #d3e2e5;
        border-radius: 8px;
        background: #f5f8fa;
        cursor: pointer;

        transition: 0.2s;

        &:after {
          content: '';
          position: absolute;
          display: none;
        }
      }

      input {
        display: none;
      }

      input:checked ~ .checkmark {
        border: 0;
        background: #37c77f;

        &:after {
          content: '';
          top: 4px;
          left: 8px;
          width: 5px;
          height: 10px;
          display: block;
          border: solid white;
          border-width: 0 3px 3px 0;
          transform: rotate(45deg);
        }
      }
    }
    .forgot-password {
      text-decoration: none;
    }
  }
`
