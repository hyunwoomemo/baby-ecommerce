import React, { useState } from "react";
import { useProduct } from "../../hooks/useProduct";
import { useParams } from "react-router-dom";
import Layout from "../../components/Client/common/Layout";
import styled from "@emotion/styled";
import { useRecoilState, useRecoilValue } from "recoil";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "@firebase/firestore";
import { db } from "../../service/firebase";
import { cartState } from "../../recoil/atoms/cartAtom";
import { addToCart } from "../../api/cart";
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

  const imageContainer = document?.querySelector(".image-container");
  const image = imageContainer?.querySelector("img");

  imageContainer?.addEventListener("mousemove", handleMouseMove);
  imageContainer?.addEventListener("mouseleave", handleMouseLeave2);

  function handleMouseMove(event) {
    const { left, top, width, height } = imageContainer.getBoundingClientRect();
    const mouseX = event.clientX - left;
    const mouseY = event.clientY - top;
    const offsetX = (mouseX / width) * 100;
    const offsetY = (mouseY / height) * 100;

    image.style.transformOrigin = `${offsetX}% ${offsetY}%`;
    image.classList.add("zoomed");
  }

  function handleMouseLeave2() {
    image.style.transformOrigin = "0 0";
    image.classList.remove("zoomed");
  }

  return (
    <Layout>
      <Base>
        <Main>
          <ProductMainImage className="image-container">
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
                        <SubImage key={i}>
                          <img onMouseOver={(e) => handleMouseOver(e)} onMouseLeave={(e) => handleMouseLeave(e)} src={v} alt="" />
                        </SubImage>
                      );
                    })
                : undefined}
            </SubImageWrapper>
            <CartBtn onClick={() => addToCart(product, currentUser)}>장바구니 담기</CartBtn>
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

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ProductMainImage = styled.div`
  width: 50%;
  max-height: 500px;
  overflow: hidden;

  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease-in-out;

    &.zoomed {
      z-index: 1;
      transform: scale(3); /* 확대 비율 */
    }
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
