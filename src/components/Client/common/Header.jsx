import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineUser, AiOutlineShoppingCart } from "react-icons/ai";
import { getAuth, signOut } from "firebase/auth";

const Header = () => {
  const location = useLocation();
  const [isFixed, setIsFixed] = useState(false);
  const [isScroll, setIsScroll] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsScroll(true);
    } else {
      setIsScroll(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    location.pathname === "/" ? setIsFixed(true) : setIsFixed(false);
  }, [location]);

  const localStorageUser = window.localStorage.getItem("currentUser");
  const navigate = useNavigate();

  const [isLogout, setIsLogout] = useState(false);

  const handleLink = () => {
    if (localStorageUser) {
      setIsLogout(!isLogout);
    } else {
      console.log("login");
      navigate("/login");
    }
  };

  const auth = getAuth();

  const handleLogout = () => {
    signOut(auth);
    window.localStorage.removeItem("currentUser");
  };

  return (
    <Base isFixed={isFixed} isScroll={isScroll}>
      <HeaderWrapper>
        <Title to="/">Jian</Title>
        <ul>
          <NavLink to="/" activeclassname="active" end>
            home
          </NavLink>
          <NavLink to="/products">all product</NavLink>
          <NavLink to="/admin/product">admin page</NavLink>
        </ul>
        <ul>
          <li>
            <AiOutlineShoppingCart />
          </li>
          <li onClick={() => handleLink()}>
            <AiOutlineUser />
            <Logout isLogout={isLogout} onClick={handleLogout}>
              <button>logout</button>
            </Logout>
          </li>
        </ul>
      </HeaderWrapper>
    </Base>
  );
};

const Base = styled.header`
  ${({ isFixed, isScroll }) =>
    isFixed && !isScroll
      ? css`
          position: fixed;
          background: transparent;
        `
      : isFixed && isScroll
      ? css`
          position: fixed;
          background-color: #fff;
        `
      : css`
          position: sticky;
          background-color: #fff;
        `}
  transition: all 0.3s;

  min-height: 112px;
  width: 100%;
  top: 0;
`;

const HeaderWrapper = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;

  .active {
    background-color: #ccc;
    padding: 10px 16px;
    border-radius: 8px;
  }

  > ul:last-of-type {
    width: 80px;
    > li {
      cursor: pointer;
    }
  }

  > ul {
    display: flex;
    gap: 1rem;
    align-items: center;

    &:last-of-type {
      justify-content: space-between;
      font-size: 24px;

      > li:first-of-type {
        position: relative;
        &:after {
          content: attr(data-count);
          position: absolute;
          width: 20px;
          height: 20px;
          top: -15px;
          right: -15px;
          display: flex;
          justify-content: center;
          align-items: center;

          background-color: gray;
          border-radius: 50%;
          font-size: 16px;
          color: #fff;
        }
      }

      > li:last-of-type {
        position: relative;
      }
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

export const Title = styled(Link)`
  display: flex;
  justify-content: center;
  width: 80px;
  font-family: "ARCHISCULPTURE_v200";
  font-size: 30px;
  font-weight: bold;

  @font-face {
    font-family: "ARCHISCULPTURE_v200";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2303@1.0/ARCHISCULPTURE_v200.woff2") format("woff2");
    font-weight: normal;
    font-style: normal;
  }
`;

export default Header;
