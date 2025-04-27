import React from 'react';
import styled from 'styled-components';

const Button = ({ text, color }) => {
  return (
    <StyledWrapper color={color}>
      <button className="button">
        {text}
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .button {
    font-weight: 600;
    position: relative;
    padding: 7px 22px;
    border-radius: 6px;
    border: none;
    color: #fff;
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: "Poppins", sans-serif;
    background-color: ${({ color }) => color || '#3AA560'}; /* Dynamic background color */
  }

  .button:active {
    transform: scale(0.96);
  }


  .button:hover {
    background-color: ${({ color }) => color ? '#db0404' : '#30824c'};
  }
`;

export default Button;
