import styled from "@emotion/styled";
import React from "react";
import Layout from "../../components/Admin/common/Layout";
import ProductList from "../../components/Admin/product/ProductList";

const Product = () => {
  return (
    <Layout>
      <Base>
        <ProductList />
      </Base>
    </Layout>
  );
};

const Base = styled.div``;

export default Product;
