import React from "react";
import AddProduct from "./AddProduct";
import MuiTable from "./MuiTable";
import styled from "@emotion/styled";
import { useRecoilState } from "recoil";
import { addProductState } from "../../../recoil/atoms/adminAtom";

const ProductList = () => {
  const [addProduct, setAddProduct] = useRecoilState(addProductState);

  return (
    <Base>
      <Container>
        <Btn onClick={() => setAddProduct(!addProduct)}>상품 등록</Btn>
        <MuiTable />
        <AddProduct />
      </Container>
    </Base>
  );
};

const Base = styled.div`
  position: relative;
`;

const Container = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Btn = styled.div`
  align-self: flex-end;
  cursor: pointer;
  padding: 10px 16px;
  background-color: tomato;
  color: #fff;
  border-radius: 10px;

  &:hover {
    color: var(--primary-color);
  }
`;

export default ProductList;
