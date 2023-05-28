
import { collection, getDocs, query } from "@firebase/firestore";
import { db } from "../service/firebase";

// 상품 리스트 가져오는 함수

export const fetchProducts = async () => {
  const querySnapshot = await getDocs(query(collection(db, "products")));
  const products = [];
  querySnapshot.forEach((doc) => {
    // Firestore에서 가져온 데이터를 필요한 형식으로 가공
    const product = {
      id: doc.id,
      ...doc.data(),
    };
    products.push(product);
  });
  return products;
};
