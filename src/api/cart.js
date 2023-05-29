import { arrayUnion, collection, doc, getDoc, onSnapshot, query, setDoc, updateDoc } from "@firebase/firestore";
import { db } from "../service/firebase";
import { useRecoilState } from "recoil";
import { cartCountState } from "../recoil/atoms/cartAtom";
import { useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-hot-toast";


export const addToCart = async (product, user) => {
  if (!user) {
    // 로그인되지 않은 경우에 대한 처리
    toast.error("로그인이 필요합니다.")
    return;
  }

  const currentUser = JSON.parse(window.localStorage.getItem('currentUser'))
  const userUid = currentUser.currentUser.user.uid;

  try {
    const { amount, category, id, image, name, price } = product;
    const cartRef = doc(db, "carts", userUid);
    const cartSnapshot = await getDoc(cartRef);
    const quantity = 1;

    if (cartSnapshot.exists()) {
      // 장바구니가 이미 존재하는 경우, 상품 추가
      await updateDoc(cartRef, {
        items: arrayUnion({ id, userUid, quantity, name, price, image, category, amount }),
      });
    } else {
      // 장바구니가 존재하지 않는 경우, 새로운 장바구니 생성
      await setDoc(cartRef, {
        items: [{ id, userUid, quantity, name, price, category, image, amount }],
      });
    }

    console.log("Product added to cart.");
  } catch (error) {
    console.error("Error adding product to cart:", error);
  }
};

// 장바구니 데이터 가져오는 함수
export const fetchCarts = async (userUid) => {
  const cartDocRef = doc(db, "carts", userUid);
  const cartDocSnap = await getDoc(cartDocRef);
  if (cartDocSnap.exists()) {
    const cart = cartDocSnap.data();
    return cart;
  }

  return null; // Return null if the cart doesn't exist
};

// 장바구니 데이터 길이 구하기 위해 실시간으로 업데이트

export function GetCartItemCount(userUid) {
  const [cartItemCount, setCartItemCount] = useRecoilState(cartCountState)

  useEffect(() => {
    const q = query(collection(db, "carts"));
    const unsubscribe = onSnapshot(q, (snapshot) => {

      const cartsArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log(cartsArray)

      cartsArray.forEach((v) => {
        if (v.id === userUid) {
          setCartItemCount(v.items.length)
        } else {
          setCartItemCount(0);
        }
      })
    });

    return () => unsubscribe();
  }, [userUid]);

  return cartItemCount
};

// 장바구니 수량 증가 및 감소

const cartsCollection = collection(db, 'carts');

const increaseQuantity = async (userId, itemId) => {
  const userDocRef = doc(cartsCollection, userId);
  const userDocSnapshot = await getDoc(userDocRef);

  if (userDocSnapshot.exists()) {
    const userData = userDocSnapshot.data();
    const itemToUpdate = userData.items.find(item => item.id === itemId);

    if (itemToUpdate) {
      // 아이템을 찾았을 때 수량 증가 로직 작성
      itemToUpdate.quantity += 1;

      await updateDoc(userDocRef, {
        items: userData.items
      });

      console.log(`아이템의 수량이 증가되었습니다. 증가된 수량: ${itemToUpdate.quantity}`);
    } else {
      console.log(`해당 아이템이 장바구니에 존재하지 않습니다. 아이템 ID: ${itemId}`);
    }
  } else {
    console.log(`유저 문서가 존재하지 않습니다. 유저 ID: ${userId}`);
  }
};
const decreaseQuantity = async (userId, itemId) => {
  const userDocRef = doc(cartsCollection, userId);
  const userDocSnapshot = await getDoc(userDocRef);

  if (userDocSnapshot.exists()) {
    const userData = userDocSnapshot.data();
    const itemToUpdate = userData.items.find(item => item.id === itemId);

    if (itemToUpdate) {
      // 아이템을 찾았을 때 수량 증가 로직 작성
      if (itemToUpdate.quantity > 0) {

        itemToUpdate.quantity -= 1;
      }

      await updateDoc(userDocRef, {
        items: userData.items
      });

      console.log(`아이템의 수량이 감소되었습니다. 감소된 수량: ${itemToUpdate.quantity}`);
    } else {
      console.log(`해당 아이템이 장바구니에 존재하지 않습니다. 아이템 ID: ${itemId}`);
    }
  } else {
    console.log(`유저 문서가 존재하지 않습니다. 유저 ID: ${userId}`);
  }
};

// React Query useMutation 훅 사용
export const useIncreaseQuantityMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(({ userId, itemId }) => increaseQuantity(userId, itemId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('carts')
      }
    });
};

export const useDecreaseQuantityMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(({ userId, itemId }) => decreaseQuantity(userId, itemId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('carts')
      }
    });
};
