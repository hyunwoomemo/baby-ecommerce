import styled from "@emotion/styled";
import React from "react";
import { Title } from "../Client/common/Header";

const Layout = ({ children }) => {
  return (
    <Base>
      <Container>{children}</Container>
    </Base>
  );
};

export default Layout;

const Base = styled.div`
  background-color: var(--footer-color);
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const InputTitle = styled(Title)`
  margin-bottom: 1rem;
  white-space: nowrap;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
  height: auto;
  background-color: #fff;
  border-radius: 15px;
  padding: 2rem;
  gap: 1rem;
`;

const Container = styled.div``;

export const InputWrapper = styled.div`
  display: flex;
  gap: 1rem;
  position: relative;

  > input {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 5px;
    position: relative;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  font-size: 16px;
  gap: 10px;
  margin-top: 2rem;

  > * {
    cursor: pointer;
    background: var(--footer-color);
    padding: 10px 16px;
    border-radius: 5px;
    border: 0;
    font-size: 16px;
  }
`;
