import { collection, getDocs, orderBy, query } from "@firebase/firestore";
import React, { useState } from "react";
import { db } from "../../service/firebase";
import { useQuery } from "react-query";
import { Link, useLocation } from "react-router-dom";
import Layout from "../../components/Client/common/Layout";
import styled from "@emotion/styled";
import { fetchProducts } from "../../api/product";
import { numberWithCommas } from "../../utils/Won";

const ProductList = () => {
  const { data: products, isLoading, error } = useQuery("products", fetchProducts);

  const location = useLocation();

  const filterProducts = location.search.replace("?=", "") ? products?.filter((v) => v.category === location.search.replace("?=", "")) : products;

  return (
    <Layout>
      <Container>
        <ProductItemWrapper>
          {filterProducts?.map((product) => {
            return (
              <ProductItem key={product.id}>
                <ProductWrapper to={product.id} key={product.id}>
                  <ImageWrapper>
                    {product.image ? <img loading="lazy" height="500" width="500" src={product.image[0]} alt="" /> : <img src="https://placehold.co/600x400" alt="placeholder"></img>}
                  </ImageWrapper>
                  <ItemName>{product.name}</ItemName>
                  <ItemPrice>{numberWithCommas(product.price)}원</ItemPrice>
                </ProductWrapper>
              </ProductItem>
            );
          })}
        </ProductItemWrapper>
      </Container>
    </Layout>
  );
};

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const ProductItemWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-evenly;
`;

const ProductItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 32%;
  overflow: hidden;
  gap: 10px;
  min-width: 200px;
  border-radius: 5px;

  @media (max-width: 1024px) {
    max-width: 45%;
  }

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const ProductWrapper = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ImageWrapper = styled.div`
  width: 100%;

  @media (max-width: 1024px) {
    height: 200px;
  }

  @media (max-width: 768px) {
    max-width: 100%;
    height: 400px;
  }
  max-height: 300px;
  height: 300px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ItemName = styled.h1``;

const ItemPrice = styled.div``;

export default ProductList;
