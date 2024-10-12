import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { fetchChestContents, updateChestContents } from '../redux/slices/adminSlice';

const AdminWrapper = styled.div`
  padding: 2rem;
`;

const ChestForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
`;

const ChestInput = styled.input`
  margin-bottom: 1rem;
  padding: 0.5rem;
`;

const ChestButton = styled.button`
  background-color: #004080;
  color: white;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
`;

function AdminPanel() {
  const dispatch = useDispatch();
  const { chestContents } = useSelector(state => state.admin);
  const [newContent, setNewContent] = useState({ text: '', link: '' });

  useEffect(() => {
    dispatch(fetchChestContents());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateChestContents(newContent));
    setNewContent({ text: '', link: '' });
  };

  return (
    <AdminWrapper>
      <h2>Admin Panel</h2>
      <ChestForm onSubmit={handleSubmit}>
        <ChestInput
          type="text"
          placeholder="Text"
          value={newContent.text}
          onChange={(e) => setNewContent({ ...newContent, text: e.target.value })}
          required
        />
        <ChestInput
          type="url"
          placeholder="Link"
          value={newContent.link}
          onChange={(e) => setNewContent({ ...newContent, link: e.target.value })}
          required
        />
        <ChestButton type="submit">Add Content</ChestButton>
      </ChestForm>
      <h3>Current Chest Contents:</h3>
      <ul>
        {chestContents.map((content, index) => (
          <li key={index}>
            {content.text} - <a href={content.link}>{content.link}</a>
          </li>
        ))}
      </ul>
    </AdminWrapper>
  );
}

export default AdminPanel;
