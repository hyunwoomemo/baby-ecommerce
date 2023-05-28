import { addDoc, collection, getFirestore } from '@firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';


export async function uploadImage(data) {
  let imageURL = null;
  if (data.length > 1) {
    try {
      const storage = getStorage();
      const uploadPromises = [];
      const downloadURLs = [];

      // 각 이미지 파일을 업로드하고 해당 업로드 작업을 Promise 배열에 추가
      data.forEach((file) => {
        const storageRef = ref(storage, 'images/' + file.name);
        const uploadTask = uploadBytes(storageRef, file);
        uploadPromises.push(uploadTask);
      });

      // 모든 업로드 작업이 완료될 때까지 기다림
      await Promise.all(uploadPromises);

      // 각 이미지의 다운로드 URL을 가져오고 해당 URL을 배열에 추가
      data.forEach((file) => {
        const storageRef = ref(storage, 'images/' + file.name);
        const downloadURLPromise = getDownloadURL(storageRef);
        downloadURLs.push(downloadURLPromise);
      });

      // 각 이미지의 다운로드 URL을 가져옴
      imageURL = await Promise.all(downloadURLs);

      console.log('이미지 업로드 및 다운로드 URL 가져오기가 완료되었습니다.');
      console.log('이미지 URL 목록:', imageURL);
    } catch (error) {
      console.error('이미지 업로드 및 다운로드 URL 가져오기 중 오류가 발생했습니다:', error);
    }
  } else {
    try {
      const storage = getStorage();
      const storageRef = ref(storage, 'images/' + data[0].name);

      // 이미지를 Firebase Storage에 업로드
      await uploadBytes(storageRef, data[0]);

      // 업로드된 이미지의 다운로드 URL 가져오기
      imageURL = [await getDownloadURL(storageRef)];
      console.log('이미지 업로드가 완료되었습니다.');
    } catch (error) {
      console.error('이미지 업로드 중 오류가 발생했습니다:', error);
    }
  }

  return imageURL
}