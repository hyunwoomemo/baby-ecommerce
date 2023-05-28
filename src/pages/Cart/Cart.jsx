import React, { useEffect, useState } from "react";
import Layout from "../../components/Client/common/Layout";
import { QueryClient, useMutation, useQuery, useQueryClient } from "react-query";
import { collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from "@firebase/firestore";
import { db } from "../../service/firebase";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { fetchCarts, useDecreaseQuantityMutation, useIncreaseQuantityMutation } from "../../api/cart";
import { useRecoilState } from "recoil";
import { cartState } from "../../recoil/atoms/cartAtom";
import { numberWithCommas } from "../../utils/Won";

const Cart = () => {
  // localstorage에 저장되어 있는 user 데이터 가져오기
  const currentUser = JSON.parse(window.localStorage.getItem("currentUser"));
  const userUid = currentUser?.currentUser?.user?.uid;

  // 장바구니에 등록된 데이터 가져오기
  const { data: carts, isLoading, error } = useQuery("carts", () => fetchCarts(userUid));

  const increaseQuantityMutation = useIncreaseQuantityMutation();
  const decreaseQuantityMutation = useDecreaseQuantityMutation();

  // 장바구니 아이템 수량 증가
  const handleIncrease = async (userId, itemId) => {
    const updatedQuantity = carts?.items.find((item) => item.id === itemId)?.quantity + 1;
    increaseQuantityMutation.mutateAsync({ userId, itemId, quantity: updatedQuantity });
  };

  // 장바구니 아이템 수량 감소
  const handleDecrease = (userId, itemId) => {
    decreaseQuantityMutation.mutate({ userId, itemId });
  };

  const [checkedItems, setCheckedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // 장바구니 전체 금액 계산
  useEffect(() => {
    let initialTotalPrice = 0;
    carts?.items.forEach((v) => {
      initialTotalPrice += parseInt(v.price) * v.quantity;
    });
    setTotalPrice(initialTotalPrice);

    setCheckedItems(carts?.items?.map((v) => v.id));
  }, [carts]);

  const handleCheckItem = (itemId, price) => {
    if (checkedItems?.includes(itemId)) {
      setCheckedItems(checkedItems.filter((id) => id !== itemId));
      setTotalPrice(totalPrice - parseInt(price));
    } else {
      setCheckedItems([...checkedItems, itemId]);
      setTotalPrice(totalPrice + parseInt(price));
    }
  };

  const total = numberWithCommas(totalPrice);

  // 장바구니 아이템 삭제

  const queryClient = useQueryClient();

  const handleDelete = async (userId) => {
    await mutation.mutateAsync(userId);
  };

  const mutation = useMutation((userId) => deleteDoc(doc(db, "carts", userId)), {
    onSuccess: () => {
      queryClient.invalidateQueries("carts");
    },
  });

  return (
    <Layout>
      <Container>
        <CartWrapper id="cart">
          <CartContainer>
            <CartRowHead>
              <tr>
                <TableHeaderCell></TableHeaderCell>
                <TableHeaderCell>
                  <Product>PRODUCT</Product>
                </TableHeaderCell>
                <TableHeaderCell>
                  <Quantity>QUANTITY</Quantity>
                </TableHeaderCell>
                <TableHeaderCell>
                  <Price>PRICE</Price>
                </TableHeaderCell>
                <TableHeaderCell>
                  <Price></Price>
                </TableHeaderCell>
              </tr>
            </CartRowHead>
            <CartTableBody>
              {carts?.items?.map((v) => {
                const itemId = v.id;
                return (
                  <CartRow key={v.id}>
                    <td>
                      <Checkbox type="checkbox" defaultChecked={true} onClick={() => handleCheckItem(itemId, v.price)} />
                    </td>
                    <td>
                      <Product>
                        <img src={v.image} alt={itemId} />
                        <Desc>
                          <span>{v.name}</span>
                        </Desc>
                      </Product>
                    </td>
                    <td>
                      <Quantity>
                        <button onClick={() => handleDecrease(v.userId, v.id)}>-</button>
                        {v.quantity}
                        <button onClick={() => handleIncrease(v.userId, v.id)}>+</button>
                      </Quantity>
                    </td>
                    <td>
                      <Price>{numberWithCommas(v.price * v.quantity)}원</Price>
                    </td>
                    <Delete onClick={() => handleDelete(v.userId)}>삭제</Delete>
                  </CartRow>
                );
              })}
            </CartTableBody>
          </CartContainer>
        </CartWrapper>
        <Order>
          <OrderWrapper>
            <Total>
              <div>Total</div>
              <div>{total}원</div>
            </Total>
            <ButtonWrapper>
              <Buy>Proceed to checkout</Buy>
              <Continue>Continue shopping</Continue>
            </ButtonWrapper>
          </OrderWrapper>
        </Order>
      </Container>
    </Layout>
  );
};

// ... the remaining code remains the same

const Container = styled.div`
  display: flex;
  gap: 2rem;
  padding: 2rem;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

const CartWrapper = styled.div`
  flex: 1 1 auto;
`;

const CartContainer = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed; // 테이블 넓이를 고정
`;
const CartTableBody = styled.tbody``;
const CartRow = styled.tr`
  padding: 2rem 0;
  border-bottom: 1px solid #ccc;

  > td {
    padding: 1rem;
    text-align: left;
    vertical-align: middle;
  }
`;
const Checkbox = styled.input``;
const Product = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  > img {
    width: 100px;
    height: 100px;
    object-fit: cover; // 이미지 비율 유지
  }
`;
const Desc = styled.div`
  display: flex;
  flex-direction: column;
`;
const Quantity = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  button {
    padding: 0.25rem 0.5rem;
    font-size: 0.8rem;
    background-color: #f8f8f8;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #e0e0e0;
    }
  }
`;

const Price = styled.div``;

const CartRowHead = styled.thead`
  background-color: #f8f8f8;

  th:first-of-type {
    width: 10%; // 첫 번째 셀의 너비 (좁게)
  }

  th:nth-of-type(2) {
    width: 40%; // 두 번째 셀의 너비 (넓게)
  }
`;
const TableHeaderCell = styled.th`
  padding: 1rem;
  text-align: left;
  font-weight: bold;
`;

const Delete = styled.td`
  cursor: pointer;

  &:hover {
    color: tomato;
  }
`;

const Order = styled.div`
  width: 30%;

  @media (max-width: 1024px) {
    width: 100%;
  }
`;

const OrderWrapper = styled.div`
  min-width: 300px;
  border: 1px solid #e7e7e7;
  padding: 1rem;
  border-radius: 10px;
`;

const Total = styled.div`
  display: flex;
  justify-content: space-between;

  > div:last-of-type {
    font-weight: bold;
  }
`;

const ButtonWrapper = styled.div`
  margin-top: 3rem;
  > div {
    padding: 10px 20px;
    border-radius: 10px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
`;

const Buy = styled.div`
  background-color: #0085fe;
  color: #fff;
`;
const Continue = styled.div`
  background-color: #e0e0e0;
`;

export default Cart;
