import { useEffect } from "react";
import styled from "styled-components";
import { actionCreators as userActions } from "../redux/modules/user";
import { useDispatch } from "react-redux";
import Loding from "../shared/Loding";

const KakaoAuthHandle = (props) => {
  const dispatch = useDispatch();
  let code = new URL(window.location.href).searchParams.get("code");
  useEffect(() => {
    dispatch(userActions.kakaoLogin(code));    
  }, []);

  return (
        <Loding></Loding>
  );
};

export default KakaoAuthHandle;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;