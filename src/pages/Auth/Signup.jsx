import React, { useState } from "react";
import Layout, { ButtonWrapper, Form, InputTitle, InputWrapper } from "../../components/Auth/Layout";
import styled from "@emotion/styled";
import { firebaseAuth, create } from "../../service/firebase";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";

const Signup = () => {
  const [errorMsg, setErrorMsg] = useState(" ");
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const { mutate: signupMutation } = useMutation((data) => create(firebaseAuth, data.id, data.pw), {
    onSuccess: () => {
      navigate("/");
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleSave = handleSubmit((data) => {
    signupMutation(data);
  });

  return (
    <Layout>
      <SignupForm onSubmit={handleSave}>
        <InputTitle>Jian</InputTitle>
        회원가입
        <InputWrapper data-text="id">
          <input type="text" {...register("id")} placeholder="id" id="id"></input>
        </InputWrapper>
        <InputWrapper data-text="password">
          <input type="password" {...register("pw")} placeholder="password" id="pw" />
        </InputWrapper>
        <ButtonWrapper>
          <Back onClick={() => navigate(-1)}>back</Back>
          <button type="submit">Sign up</button>
        </ButtonWrapper>
      </SignupForm>
    </Layout>
  );
};

const SignupForm = styled(Form)`
  position: relative;
`;

const Back = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;

  background-color: transparent;
`;

export default Signup;
