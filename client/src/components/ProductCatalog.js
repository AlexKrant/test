import React from 'react';
import styled from 'styled-components';

const CatalogWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 2rem;
`;

const ChestCard = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
`;

const ChestImage = styled.img`
  width: 100px;
  height: 100px;
`;

const chests = [
  { name: 'Bronze Chest', image: '/images/bronze-chest.png', price: 1 },
  { name: 'Silver Chest', image: '/images/silver-chest.png', price: 1 },
  { name: 'Gold Chest', image: '/images/gold-chest.png', price: 1 },
];

function ProductCatalog() {
  return (
    <CatalogWrapper>
      {chests.map(chest => (
        <ChestCard key={chest.name}>
          <ChestImage src={chest.image} alt={chest.name} />
          <h3>{chest.name}</h3>
          <p>${chest.price}</p>
        </ChestCard>
      ))}
    </CatalogWrapper>
  );
}

export default ProductCatalog;
