import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { addFunds } from '../redux/slices/userSlice';

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #004080;
  color: white;
`;

const Username = styled.span`
  font-weight: bold;
`;

const Balance = styled.span`
  font-weight: bold;
`;

const AddFundsButton = styled.button`
  background-color: #00cc00;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  &:disabled {
    background-color: #999;
    cursor: not-allowed;
  }
`;

function Header() {
  const dispatch = useDispatch();
  const { username, balance, lastTopUp } = useSelector(state => state.user);
  const canAddFunds = !lastTopUp || (Date.now() - lastTopUp) > 60 * 60 * 1000;

  const handleAddFunds = async () => {
    try {
      const result = await dispatch(addFunds(10)).unwrap();
      if (result.paymentUrl) {
        window.open(result.paymentUrl, '_blank');
      }
    } catch (error) {
      console.error('Error adding funds:', error);
    }
  };

  return (
    <HeaderWrapper>
      <Username>{username}</Username>
      <AddFundsButton onClick={handleAddFunds} disabled={!canAddFunds}>
        Add Funds
      </AddFundsButton>
      <Balance>${balance.toFixed(2)}</Balance>
    </HeaderWrapper>
  );
}

export default Header;
