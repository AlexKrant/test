import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { openChest } from '../redux/slices/userSlice';

const SliderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
`;

const ChestImage = styled.img`
  width: 150px;
  height: 150px;
  cursor: pointer;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.1);
  }
`;

const PopupWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PopupContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
`;

function ChestSlider() {
  const dispatch = useDispatch();
  const { balance } = useSelector(state => state.user);
  const [popupContent, setPopupContent] = useState(null);

  const handleChestClick = async (chestType) => {
    if (balance >= 1) {
      const result = await dispatch(openChest(chestType));
      setPopupContent(result.payload);
    } else {
      alert('Insufficient balance. Please add funds.');
    }
  };

  return (
    <SliderWrapper>
      <ChestImage
        src="/images/bronze-chest.png"
        alt="Bronze Chest"
        onClick={() => handleChestClick('bronze')}
      />
      <ChestImage
        src="/images/silver-chest.png"
        alt="Silver Chest"
        onClick={() => handleChestClick('silver')}
      />
      <ChestImage
        src="/images/gold-chest.png"
        alt="Gold Chest"
        onClick={() => handleChestClick('gold')}
      />
      {popupContent && (
        <PopupWrapper onClick={() => setPopupContent(null)}>
          <PopupContent>
            <h3>{popupContent.text}</h3>
            <a href={popupContent.link} target="_blank" rel="noopener noreferrer">
              Click here
            </a>
          </PopupContent>
        </PopupWrapper>
      )}
    </SliderWrapper>
  );
}

export default ChestSlider;
