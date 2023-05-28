import styled from "@emotion/styled";
import React from "react";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <Base>
      <Main>
        <Header />
        <Contents>{children}</Contents>
      </Main>
    </Base>
  );
};

const Base = styled.div`
  display: flex;
`;

const Main = styled.div`
  background-color: #fafafa;
  flex: 1 1 auto;
`;

const Contents = styled.div``;

export default Layout;
