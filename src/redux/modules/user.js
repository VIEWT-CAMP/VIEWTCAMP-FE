import axios from "axios";
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import api from "../../shared/api.jsx";

// actions
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const SET_USER = "SET_USER";
const GET_USER_LIST = "GET_USER_LIST";
const GET_FOLLOWER = "GET_FOLLOWER"
const GET_FOLLOWING = "GET_FOLLOWING"
const ADD_FOLLOWING = "ADD_FOLLOWING"
const UN_FOLLOW = "UN_FOLLOW"
// action creators]
const logout = createAction(LOG_OUT, (payload) => ({ payload }));
const setUser = createAction(SET_USER, (user) => ({ user }));
const getUserList = createAction(GET_USER_LIST, (user) => ({ user }));
const getFollower = createAction(GET_FOLLOWER, (user) => ({ user }))
const getFollowing = createAction(GET_FOLLOWING, (user) => ({ user }))
const addFollowing = createAction(ADD_FOLLOWING, (kakao_id) => ({ kakao_id }))
const unFollow = createAction(UN_FOLLOW, (id, user) => ({ id }))
// initialState
const initialState = {
  user_list : [],
  follower_list : [],
  following_list : [],
  user: null,
  is_login: false,
};
// middleware actions
const getUserListDB = (roomId) => {
  return async function (dispatch, getState, {history}) {
    const token = sessionStorage.getItem("Authorization");
      try {
          await api
              .get(`/user-enter/${roomId}`,{
                  headers: {
                      "Authorization": token
                  }
              })
              .then((res) => {
                  dispatch(getUserList(res.data));
                })
                .catch((error) => console.log(error));
      } catch (err) {
          alert("유저정보를 불러오는데에 실패했습니다.");
      };
  };
};
const getFollowerDB = () => {
  return async function (dispatch, getState, {history}) {
    const token = sessionStorage.getItem("Authorization");
      try {
          await api
              .get(`/user-follower`,{
                  headers: {
                      "Authorization": token
                  }
              })
              .then((res) => {
                  dispatch(getFollower(res.data));
                })
                .catch((error) => console.log(error));
      } catch (err) {
          alert("유저정보를 불러오는데에 실패했습니다.");
      };
  };
};
const getFollowingDB = () => {
  return async function (dispatch, getState, {history}) {
    const token = sessionStorage.getItem("Authorization");
      try {
          await api
              .get(`/user-following`,{
                  headers: {
                      "Authorization": token
                  }
              })
              .then((res) => {
                  dispatch(getFollowing(res.data));
                })
                .catch((error) => console.log(error));
      } catch (err) {
          alert("유저정보를 불러오는데에 실패했습니다.");
      };
  };
};
const addFollowingDB = (kakao_id) => {
  return async function (dispatch, getState, {history}) {
    const token = sessionStorage.getItem("Authorization");
      try {
        const data = {
          kakaoId : kakao_id
        }
          await api
              .post(`/user-following`,
              data,{
                  headers: {
                      "Authorization": token
                  }
              }).then((res) => {
                dispatch(addFollowing(res.data),
                api.get("/user-follower",{
                  headers: {
                    Authorization: token
                }
              }).then((res) => {
                dispatch(getFollower(res.data)
                )})
              )})
                .catch((error) => console.log(error));
      } catch (err) {
          alert("유저정보를 불러오는데에 실패했습니다.");
      };
  };
};
const unFollowingDB = (id) => {
  return async function (dispatch, getState, {history}) {
    const token = sessionStorage.getItem("Authorization");
      try {
          await api
              .delete(`/user-unfollowing/${id}`,
              {
                  headers: {
                      "Authorization": token
                  }
              })
              .then((res) => {
                dispatch(unFollow(res.data),
                api.get("/user-follower",{
                  headers: {
                    Authorization: token
                }
              }).then((res) => {
                dispatch(getFollower(res.data),
                )})
              )})
                .catch((error) => console.log(error));
      } catch (err) {
          alert("유저정보를 불러오는데에 실패했습니다.");
      };
  };
};
const kakaoLogin = (code) => {
  return async function (dispatch, getState, { history }) {
    const token = sessionStorage.getItem("Authorization");
    try {
      await api
        .get(`/user/kakao/callback?code=${code}`,{
           headers: {
            "content-type": "application/json;charset=UTF-8",
            accept: "application/json",
            Authorization: token,
          }
        })
        .then(function (res) {
          const jwtToken = res.data.jwtToken;
          const nickname = res.data.nickname;
          sessionStorage.setItem("Authorization", jwtToken);
          sessionStorage.setItem("nickname", nickname);
          dispatch(setUser(nickname));
          history.replace("/"); //토큰받아서 로그인 후 화면 전환(메인)
        });
    } catch (err) {
      window.alert("로그인에 실패하였습니다.");
      history.replace("/login");
    }
  };
};
// reducer
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        //리덕스에 담는 것
        draft.user = action.payload.user;
        draft.is_login = true;
      }),
      [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        sessionStorage.removeItem("nickname");
        sessionStorage.removeItem("Authorization");
        draft.user = null;
        draft.is_login = false;
      }),
      [GET_USER]: (state, action) => produce(state, (draft) => {}),
      [GET_USER_LIST]: (state, action) => produce(state, (draft) => {
        draft.user_list = action.payload.user;
      }),
      [GET_FOLLOWER]: (state, action) => produce(state, (draft) => {
        draft.follower_list = action.payload.user;
      }),
      [GET_FOLLOWING]: (state, action) => produce(state, (draft) => {
        draft.following_list = action.payload.user;
      }),
      [ADD_FOLLOWING]: (state, action) => produce(state, (draft) => {
        draft.following_list.push(action.payload.kakao_id);
      }),
      [UN_FOLLOW]: (state, action) => produce(state, (draft) => {
        let idx = draft.following_list.findIndex((p) => p.id === action.payload.id);
        draft.following_list.splice(idx, 1);
      }),
  },
  initialState
);
// action creator export
const actionCreators = {
  logout,
  kakaoLogin,
  getUserList,
  getUserListDB,
  getFollowerDB,
  addFollowingDB,
  getFollowingDB,
  unFollowingDB,
};
export { actionCreators };