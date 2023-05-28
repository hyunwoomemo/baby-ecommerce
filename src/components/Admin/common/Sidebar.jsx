import styled from "@emotion/styled";
import React from "react";
import { Title } from "../../Client/common/Header";
import { MdStorefront } from "react-icons/md";
import { NavLink } from "react-router-dom";

const menuItem = [{ name: "Product", icon: <MdStorefront />, to: "/admin/product" }];

const Sidebar = () => {
  return (
    <Base>
      <Logo to="/">Jian</Logo>
      <MenuWrapper>
        <MenuTitle>Menu</MenuTitle>
        <MenuItemWrapper>
          {menuItem.map((v) => {
            console.log(v);
            return (
              <MenuItem activeclassname="active" to={v.to} key={v.name} end>
                <div>{v.icon}</div>
                <div>{v.name}</div>
              </MenuItem>
            );
          })}
        </MenuItemWrapper>
      </MenuWrapper>
    </Base>
  );
};

const Base = styled.div`
  min-width: 250px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-right: var(--transparent-border);
  padding: 1rem;
`;

const Logo = styled(Title)`
  padding: 2rem;
  align-self: center;
`;

const MenuWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const MenuTitle = styled.h2`
  padding: 10px 20px;
  color: #ccc;
`;

const MenuItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MenuItem = styled(NavLink)`
  display: flex;
  gap: 10px;
  padding: 10px 20px;
  &.active {
    background-color: #f1f4ff;
    position: relative;
    border-radius: 5px;

    &:before {
      content: "";
      position: absolute;
      width: 3px;
      height: 100%;
      top: 0;
      left: 0;
      background-color: #184bb5;
      border-radius: 5px 0 0 5px;
    }
  }
`;

export default Sidebar;
