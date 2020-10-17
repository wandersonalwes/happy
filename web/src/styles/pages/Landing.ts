import styled from 'styled-components'

export const Container = styled.div`
  padding: 15px;

  width: 100vw;
  height: 100vh;
  background: linear-gradient(329.54deg, #29b6d1 0%, #00c7c7 100%);

  display: flex;
  justify-content: center;
  align-items: center;
  main {
    h1,
    p {
      max-width: 358px;
    }
    h1 {
      font-size: 76px;
      font-weight: 900;
      line-height: 78px;
    }
    p {
      margin-top: 40px;
      font-size: 24px;
      line-height: 34px;
    }
  }

  .content-wrapper {
    position: relative;
    width: 100%;
    max-width: 1100px;

    height: 100%;
    max-height: 688px;

    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: space-between;

    background: url('/images/landing.svg') no-repeat 80% center;

    .location {
      position: absolute;
      right: 0;
      top: 0;

      font-size: 24px;
      line-height: 34px;

      display: flex;
      flex-direction: column;

      text-align: right;

      strong {
        font-weight: 800;
      }
    }

    .enter-app {
      position: absolute;
      right: 0;
      bottom: 0;

      width: 80px;
      height: 80px;
      background: #fffd66;
      border-radius: 38px;

      display: flex;
      align-items: center;
      justify-content: center;

      transition: background-color 0.2s;

      &:hover {
        background: #96feff;
      }
    }
  }
`
