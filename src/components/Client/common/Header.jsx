import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineUser, AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";
import { GetCartItemCount } from "../../../api/cart";
import { firebaseAuth } from "../../../service/firebase";
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

  // 장바구니 클릭
  const handleCart = () => {
    if (localStorageUser) {
      navigate("/cart");
    } else {
      console.log("login");
      navigate("/login");
    }
  };

  // 장바구니 아이템 갯수
  const currentUser = JSON.parse(window.localStorage.getItem("currentUser"));
  const userUid = currentUser?.currentUser?.user?.uid;

  const cartItemCount = GetCartItemCount(userUid);

  const auth = getAuth();

  const handleLogout = () => {
    signOut(auth);
    window.localStorage.removeItem("currentUser");
  };

  // 모바일 환경에서 sidenavbar의 상태 관리
  const [showNav, setShowNav] = useState(false);
  const handleSideNavbar = () => {
    setShowNav(!showNav);
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

    @media (max-width: 768px) {
      /* display: none; */
    }

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

          background-color: tomato;
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

const SideNavBar = styled.div`
  @media (min-width: 769px) {
    display: none;
  }

  display: flex;
  flex-direction: column;
  gap: 3px;

  > span {
    transition: all 0.3s;
    ${({ showNav }) =>
      showNav
        ? css`
            &:nth-of-type(2) {
              opacity: 0;
            }

            &:first-of-type {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%) rotate(40deg);
              transform-origin: 50% 50%;
            }

            &:last-of-type {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%) rotate(-45deg);
              transform-origin: 50% 50%;
            }
          `
        : css``}

    border-radius: 3px;
    width: 20px;
    height: 3px;
    display: inline-block;
    background-color: #525252;
  }
`;

const Slide = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 100vh;
  width: 150px;

  background-color: #fff;
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
