import React from 'react';
import styled from 'styled-components';

const Button = () => {
  return (
    <StyledWrapper>
      <button className="bookmarkBtn">
        <span className="IconContainer">
        <img width="24" height="24" src="https://img.icons8.com/color/48/add-shopping-cart--v1.png" alt="add-shopping-cart--v1"/>
        </span>
        <p className="text">Add To Cart</p>
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: flex; /* Center the button horizontally */
  justify-content: center; /* Center the button horizontally */
  align-items: center; /* Center the button vertically */
  margin-bottom: 2rem; /* Add margin at the bottom */
  margin-top: 1rem;

  .bookmarkBtn {
    width: 12rem;
    height: 3rem;
    border-radius: 2rem;
    border: 1px solid rgba(17, 232, 56, 0.349);
    background-color: rgb(9, 85, 34);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition-duration: 0.3s;
    overflow: hidden;
  }

  .IconContainer {
    width: 3rem;
    height: 25px;
    background: linear-gradient(to bottom, white , white);
    border-radius: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    z-index: 2;
    transition-duration: 0.3s;
    margin-left: 0.75rem;
    
  }

  .icon {
    border-radius: 1px;
  }

  .text {
    height: 10rem;
    width: 10rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    z-index: 1;
    transition-duration: 0.3s;
    font-size: 1.04em;
  }

  .bookmarkBtn:hover .IconContainer {
    width: 150px;
    transition-duration: 0.3s;
  }

  .bookmarkBtn:hover .text {
    transform: translate(10rem);
    width: 0;
    font-size: 0;
    transition-duration: 0.3s;
  }

  .bookmarkBtn:active {
    transform: scale(1.5);
    transition-duration: 0.3s;
  }
`;

export default Button;