import styled from "@emotion/styled";
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Base>
      <Link to="/admin/product">관리자 페이지</Link>
    </Base>
  );
};

const Base = styled.div`
  background-color: var(--footer-color);
  min-height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 0;
  width: 100%;
  margin-top: auto;
`;

export default Footer;
