import React, { useState } from "react";
import { useProduct } from "../../hooks/useProduct";
import { useParams } from "react-router-dom";
import Layout from "../../components/Client/common/Layout";
import styled from "@emotion/styled";
import { numberWithCommas } from "../../utils/Won";

function ProductDetails() {
  const { id } = useParams();
  const currentUser = JSON.parse(window.localStorage.getItem("currentUser"));

  const { product, isLoading, error } = useProduct(id);

  const [isHoverImg, setIsHoverImg] = useState("");

  const handleMouseOver = (e) => {
    setIsHoverImg(e.target.src);
  };

  const handleMouseLeave = (e) => {
    setIsHoverImg();
  };

  return (
    <Layout>
      <Base>
        <Main>
          <ProductMainImage>
            <img src={isHoverImg ? isHoverImg : product?.image[0]} alt="" />
          </ProductMainImage>
          <ProductDesc>
            <ProductCategory>{product?.category}</ProductCategory>
            <ProductName>{product?.name}</ProductName>
            <ProductPrice>{numberWithCommas(product?.price)}원</ProductPrice>
            <SubImageWrapper>
              {product?.image.length > 1
                ? product?.image
                    .filter((v, i) => i !== 0)
                    .map((v, i, arr) => {
                      return (
                        <SubImage>
                          <img onMouseOver={(e) => handleMouseOver(e)} onMouseLeave={(e) => handleMouseLeave(e)} src={v} alt="" />
                        </SubImage>
                      );
                    })
                : undefined}
            </SubImageWrapper>
            <CartBtn>장바구니 담기</CartBtn>
          </ProductDesc>
        </Main>
      </Base>
    </Layout>
  );
}

const Base = styled.div`
  max-width: 1024px;
  width: 100%;
  margin: 0 auto;
`;

const Main = styled.div`
  display: flex;
  gap: 2rem;
`;

const ProductMainImage = styled.div`
  width: 50%;
  max-height: 500px;
  overflow: hidden;

  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProductDesc = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1 1 auto;
`;

const ProductName = styled.div`
  font-size: 20px;
`;
const ProductCategory = styled.div`
  padding: 5px 10px;
  background-color: var(--footer-color);
  align-self: flex-start;
  border-radius: 5px;
`;
const ProductPrice = styled.div``;

const CartBtn = styled.div`
  width: 100%;
  margin-top: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #4d4021;
  padding: 1rem;
  color: #fff;
  cursor: pointer;

  &:hover {
    background-color: #5d5031;
  }
`;

const SubImageWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

const SubImage = styled.div`
  height: 100px;
  width: 100px;

  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default ProductDetails;
