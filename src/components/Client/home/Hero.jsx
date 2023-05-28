import styled from "@emotion/styled";
import React from "react";
import Banner from "../../../image/KakaoTalk_20230527_192203011_01-min.jpg";

const Hero = () => {
  return (
    <Base>
      <SlideWrapper>
        <img src={Banner} alt="" />
      </SlideWrapper>
    </Base>
  );
};

const Base = styled.div`
  overflow: hidden;
`;

const SlideWrapper = styled.div`
  width: 100%;
  height: auto;

  > img {
    width: 100%;
    object-fit: cover;
  }
`;

export default Hero;
