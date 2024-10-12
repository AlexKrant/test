import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { login, register } from '../redux/slices/userSlice';

const AuthWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
`;

const AuthInput = styled.input`
  margin-bottom: 1rem;
  padding: 0.5rem;
`;

const AuthButton = styled.button`
  background-color: #004080;
  color: white;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
`;

function Auth() {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      dispatch(login({ email, password }));
    } else {
      dispatch(register({ email, password }));
    }
  };

  return (
    <AuthWrapper>
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <AuthForm onSubmit={handleSubmit}>
        <AuthInput
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <AuthInput
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <AuthButton type="submit">{isLogin ? 'Login' : 'Register'}</AuthButton>
      </AuthForm>
      <p>
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <button onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Register' : 'Login'}
        </button>
      </p>
    </AuthWrapper>
  );
}

export default Auth;
