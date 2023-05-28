import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { uploadImage } from "../../../utils/uploadImage";
import { addDoc, collection } from "@firebase/firestore";
import { db } from "../../../service/firebase";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import Portal from "../common/Portal";
import { useRecoilState } from "recoil";
import { addProductState } from "../../../recoil/atoms/adminAtom";

const AddProduct = () => {
  const [selectedImages, setSelectedImages] = useState(null);
  const [previewImages, setPreviewImages] = useState(null);
  const fileInputRef = useRef();
  const { register, handleSubmit } = useForm();

  const handleImageChange = (e) => {
    const files = e.target.files;
    const previewImages = Array.from(files).map((file) => URL.createObjectURL(file));
    setPreviewImages(previewImages);
    const images = Array.from(files);
    setSelectedImages(images);
  };

  const handleSave = handleSubmit(async (data) => {
    try {
      const currentUser = JSON.parse(window.localStorage.getItem("currentUser"));
      const userId = currentUser.currentUser.user.uid;
      const imageURL = await uploadImage(selectedImages);
      console.log(imageURL);

      await addDoc(collection(db, "products"), {
        userId: userId,
        image: imageURL,
        name: data.name,
        price: data.price,
        amount: data.amount,
        category: data.category,
      });
    } catch (error) {
      // 상품 등록 요청 중 오류 발생
      console.log(error);
    }
  });

  const handleDeleteImage = (image, index) => {
    const updatedImages = previewImages.filter((v, i) => v !== image);
    setPreviewImages(updatedImages);
    selectedImages.splice(index, 1);
  };

  const [addProduct, setAddProduct] = useRecoilState(addProductState);

  return (
    <Portal selector="#portal">
      <Overlay show={addProduct} onClick={() => setAddProduct(false)}></Overlay>
      <Base show={addProduct}>
        <Form onSubmit={handleSave}>
          <FileInputWrapper>
            <FileInputLabel htmlFor="file-input">이미지 선택</FileInputLabel>
            <FileCount>{previewImages && previewImages.length > 0 && `파일 개수: ${previewImages.length}`}</FileCount>
            <FileInput id="file-input" type="file" name="images" accept="image/*" multiple onChange={handleImageChange} ref={fileInputRef} max={3} />
          </FileInputWrapper>
          <PreviewWrapper>
            {previewImages &&
              previewImages.map((image, index) => (
                <ImageWrapper key={index}>
                  <img src={image} alt="Preview" />
                  <button onClick={() => handleDeleteImage(image, index)}>x</button>
                </ImageWrapper>
              ))}
          </PreviewWrapper>
          <input type="text" placeholder="상품명" {...register("name")} />
          <input type="number" placeholder="가격" {...register("price")} />
          <input type="number" placeholder="재고" min={0} {...register("amount")} />
          <input type="text" placeholder="카테고리" {...register("category")} />
          <button type="submit">상품 등록</button>
        </Form>
      </Base>
    </Portal>
  );
};

const Overlay = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0%;
  left: 0;
  background-color: #80808052;
  cursor: pointer;

  ${({ show }) =>
    show
      ? css`
          display: block;
        `
      : css`
          display: none;
        `}
`;

const Base = styled.div`
  position: absolute;
  width: 50vw;
  height: 100vh;
  top: 0;
  transition: all 0.3s;
  right: 0;
  ${({ show }) =>
    show
      ? css`
          transform: translateX(0);
        `
      : css`
          transform: translateX(100%);
        `}
  background-color: #fff;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  padding: 2rem;

  input[type="file"] {
  }
`;

const FileInputWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const FileInputLabel = styled.label`
  cursor: pointer;
`;

const FileInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  width: 0;
  height: 0;
`;

const FileCount = styled.div``;

const PreviewWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

const ImageWrapper = styled.div`
  max-width: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--detail-view-color);
  padding: 1rem;
  border-radius: 20px;
  position: relative;

  > img {
    width: 100%;
    height: auto;
  }

  > button {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    right: 10px;
    top: 10px;
    background: pink;
    border: 0;
    padding: 5px;
    border-radius: 50%;
    width: 20px;
    height: 20px;
  }
`;

export default AddProduct;
