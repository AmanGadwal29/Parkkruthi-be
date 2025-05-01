import React from 'react';
import styled from 'styled-components';

const Button = ({text}) => {
  return (
    <StyledWrapper>
      <button className="button">
        {text}
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .button {
    position: relative;
    padding: 7px 22px;
    border-radius: 6px;
    border: none;
    color: #fff;
    cursor: pointer;
    background-color: #3AA560;
    transition: all 0.2s ease;
    font-family: "Poppins", sans-serif ;
  }

  .button:active {
    transform: scale(0.96);
  }

  .button:before,
  .button:after {
    position: absolute;
    content: "";
    width: 150%;
    left: 50%;
    height: 100%;
    transform: translateX(-50%);
    z-index: -1000;
    background-repeat: no-repeat;
  }

  .button:hover:before {
    top: -70%;
    background-image: radial-gradient(circle, #7d2ae8 20%, transparent 20%),
      radial-gradient(circle, transparent 20%, #7d2ae8 20%, transparent 30%),
      radial-gradient(circle, #7d2ae8 20%, transparent 20%),
      radial-gradient(circle, #7d2ae8 20%, transparent 20%),
      radial-gradient(circle, transparent 10%, #7d2ae8 15%, transparent 20%),
      radial-gradient(circle, #7d2ae8 20%, transparent 20%),
      radial-gradient(circle, #7d2ae8 20%, transparent 20%),
      radial-gradient(circle, #7d2ae8 20%, transparent 20%),
      radial-gradient(circle, #7d2ae8 20%, transparent 20%);
    background-size: 10% 10%, 20% 20%, 15% 15%, 20% 20%, 18% 18%, 10% 10%, 15% 15%,
      10% 10%, 18% 18%;
    background-position: 50% 120%;
    animation: greentopBubbles 0.6s ease;
  }


  }`;

export default Button;
