import styled from "@emotion/styled";
import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <Container>
      <Header />
      <Base>{children}</Base>
      <Footer />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Base = styled.div`
  display: flex;
  gap: 1rem;
  padding: 2rem;
  flex: 1 1 auto;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

export default Layout;
