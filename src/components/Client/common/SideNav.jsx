import React from "react";
import Portal from "../../Admin/common/Portal";
import styled from "@emotion/styled";
import { useRecoilState } from "recoil";
import { sideNavState } from "../../../recoil/atoms/sidenavAtom";
import { css } from "@emotion/react";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";

const SideNav = ({ handleCart, cartItemCount, handleLink, isLogout, handleLogout }) => {
  const [sideNav, setSideNav] = useRecoilState(sideNavState);
  return (
    <Portal selector="#portal">
      <Container sideNav={sideNav}>
        <Overlay onClick={() => setSideNav(false)}></Overlay>
        <SideNavbar sideNav={sideNav} onClick={() => setSideNav(false)}>
          <ul>
            <Link to="/" activeclassname="active" end>
              home
            </Link>
            <Link to="/products">all product</Link>
            <Link to="/admin/product">admin page</Link>
          </ul>
          <ul>
            <li onClick={handleCart} data-count={cartItemCount}>
              <AiOutlineShoppingCart />
            </li>
            <li onClick={() => handleLink()}>
              <AiOutlineUser />
              <Logout isLogout={isLogout} onClick={handleLogout}>
                <button>logout</button>
              </Logout>
            </li>
          </ul>
        </SideNavbar>
      </Container>
    </Portal>
  );
};

const Container = styled.div`
  overflow: hidden;
  ${({ sideNav }) =>
    sideNav
      ? css`
          opacity: 1;
          pointer-events: all;
        `
      : css`
          opacity: 0;
          pointer-events: none;
        `}
`;

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #00000052;
`;

const SideNavbar = styled.div`
  width: 200px;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  background-color: #fff;
  transition: all 0.3s;
  padding: 2rem;

  ${({ sideNav }) =>
    sideNav
      ? css`
          opacity: 1;
        `
      : css`
          opacity: 0;
        `}

  >ul {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;

    padding: 1rem 0;

    &:last-of-type {
      display: flex;
      flex-direction: row;
      justify-content: center;
      font-size: 24px;
      gap: 1rem;
    }
  }
`;

const Logout = styled.div`
  position: absolute;
  transition: all 0.3s;
  ${({ isLogout }) =>
    isLogout
      ? css`
          opacity: 1;
          pointer-events: all;
        `
      : css`
          opacity: 0;
          pointer-events: none;
        `}
`;

export default SideNav;
