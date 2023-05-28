import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { AiOutlineUser, AiOutlineShoppingCart } from "react-icons/ai";
import { Link, NavLink, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  // 헤더와 홈 화면의 이미지가 어우러질 수 있게 fixed속성, 스크롤 하기 전에는 배경색을 투명
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
          <li>
            <AiOutlineUser />
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
