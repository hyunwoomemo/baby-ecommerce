import styled from "@emotion/styled";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Layout, { ButtonWrapper, Form, InputTitle, InputWrapper } from "../../components/Auth/Layout";
import { firebaseAuth, login } from "../../service/firebase";
import { useMutation } from "react-query";
import { useRecoilState } from "recoil";
import { currentUserAtom } from "../../recoil/atoms/currentUserAtom";
import { toast } from "react-hot-toast";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useRecoilState(currentUserAtom);

  const { mutate: loginMutation } = useMutation((data) => login(firebaseAuth, data.id, data.pw), {
    onSuccess: (curUserInfo) => {
      setCurrentUser(curUserInfo);
      navigate("/");
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleSave = handleSubmit((data) => {
    toast.success("로그인에 성공했습니다.");
    loginMutation(data);
  });

  return (
    <Layout>
      <LoginForm onSubmit={handleSave}>
        <InputTitle to="/">Jian</InputTitle>
        <div>로그인</div>
        <div>ID: test@test.com / PW: test123</div>
        <InputWrapper data-text="id">
          <input type="text" {...register("id")} placeholder="id" id="id"></input>
        </InputWrapper>
        <InputWrapper data-text="password">
          <input type="password" {...register("pw")} placeholder="password" id="pw" />
        </InputWrapper>
        <ButtonWrapper>
          <button type="submit">Login</button>
          <Link to="/signup"> Sign up</Link>
        </ButtonWrapper>
      </LoginForm>
    </Layout>
  );
};

const LoginForm = styled(Form)``;

export default Login;
