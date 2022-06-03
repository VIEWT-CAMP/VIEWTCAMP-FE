import './App.css';
import styled from 'styled-components';
import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from "./redux/configureStore";
import Login from './pages/Login';
import KakaoAuthHandle from './pages/KaKaoAuthHandle';
import Main from './pages/Main';
import CreatRoom from './pages/CreatRoom'
import videoCheck from './pages/videoCheck'
import StudyList from './pages/StudyList';
import StudyChatRoom from './pages/StudyChatRoom'
import Mypage from './pages/Mypage';
import Review from './pages/Review';
import Privacy from './pages/Privacy';
import Loding from './shared/Loding';

function App() {
  return (
    <React.Fragment>
      <ContentWrap>  
        <ConnectedRouter  history={history}>
        <Route path="/" exact component={Main} />
        <Route path="/login" exact component={Login} />
        <Route path="/oauth/kakao/callback" exact component={KakaoAuthHandle} />              
        <Route path="/creatroom" exact component={CreatRoom} /> 
        <Route path="/studylist" exact component={StudyList} />     
        <Route path="/room/:id" exact component={StudyChatRoom} />     
        <Route path="/review/:id/:title" exact component={Review} />     
        <Route path="/videoCheck/:id" exact component={videoCheck} />     
        <Route path="/mypage/:id" exact component={Mypage} />     
        <Route path="/privacy" exact component={Privacy} />    
        <Route path="/loding" exact component={Loding} />         
        </ConnectedRouter>
      </ContentWrap>
    </React.Fragment>
  );
}

const ContentWrap = styled.div`
  min-height : 100vh;
  box-sizing: border-box;
  background : #F5F5FB;
  
`


export default App;
