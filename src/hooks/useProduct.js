import { useQuery } from 'react-query';
import { collection, getDoc, getDocs, doc } from 'firebase/firestore';
import { db } from '../service/firebase';

export function useProduct(id) {
  const fetchProduct = async () => {
    const docRef = doc(db, 'products', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const product = { id: docSnap.id, ...docSnap.data() };
      return product;
    } else {
      throw new Error('Product not found');
    }
  };

  const { data: product, isLoading, error } = useQuery(['product', id], fetchProduct);

  return { product, isLoading, error };
}