import styled from "@emotion/styled";
import React from "react";

const Header = () => {
  return (
    <Base>
      <Container>
        <Title>Dashboard</Title>
        <ul>
          <li>알림</li>
          <li>프로필</li>
        </ul>
      </Container>
    </Base>
  );
};

const Base = styled.div`
  padding: 2rem;
  border-bottom: var(--transparent-border);
`;

const Container = styled.div`
  display: flex;
  > ul {
    display: flex;
    gap: 1rem;
  }
`;

const Title = styled.div`
  margin-right: auto;
  font-size: 24px;
  font-weight: bold;
`;

export default Header;
