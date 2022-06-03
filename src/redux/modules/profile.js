import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import api from "../../shared/api.jsx";

// action
const GET_PROFILE = "GET_PROFILE";
const EDIT_PROFILE = "EDIT_PROFILE";
const EDIT_USERPR = "EDIT_USERPR";
const SET_PREVIEW = "SET_PREVIEW";
// action creators
const getProfile = createAction(GET_PROFILE, (profile_list) => ({ profile_list }));
const editProfileImg = createAction(EDIT_PROFILE, (profile) => ({ profile }));
const setPreview = createAction(SET_PREVIEW, (preview) => ({ preview }));
const editUserPr = createAction(EDIT_USERPR, (user_pr) => ({ user_pr }));
// init
const initialState = {
    list: [],
    user_pr: [],
    preview: null,
};
const initialPost = {
    nickname: "",
    profileImg: "",
    userPr: "",
  };
  
const getProfileDB = () => {
  return async function (dispatch, getState, {history}) {
    const token = sessionStorage.getItem("Authorization");
      try {
          await api
              .get("/user-myinfo",{
                  headers: {
                      "Authorization": token
                  }
              })
              .then((res) => {
                  dispatch(getProfile(res.data));
                })
                .catch((error) => console.log(error));
      } catch (err) {
          alert("예상질문을 불러오는데에 실패했습니다.");
      };
  };
};
const editProfileImgDB = (post) => {
    return async function (dispatch, getState, { history }) {
      const formData = new FormData();
      const token = sessionStorage.getItem("Authorization");
      formData.append("file", post.file);

      await api({
          method: "put",
          url: "/user-image/change",
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": token,
          },
        })
        .then((res) => {
          dispatch(getProfile({post}),
          api.get("/user-myinfo",{
            headers: {
              Authorization: token
          }
        }).then((res) => {
          dispatch(editProfileImg(res.data)
          )})
        )})
        .catch((err) => {
          console.log(err);
          alert(err.response.data.message);
        });
    };
  };
const editUserPrDB = (user_pr) => {
    return async function (dispatch, getState, { history }) {
        const _userPr = getState().profile.list;
        const data = {
          userPr : user_pr.des !== null ? user_pr.des : _userPr
        }
        const token = sessionStorage.getItem("Authorization");

        await api.put("/user-introduce/change",

        data
          , {
              headers: {
                  Authorization: token
              }
          })
          .then((res) => {
            dispatch(editUserPr(user_pr))
            return;
          })
          .catch((err) => {
            console.log(err);
          });
      };
  };
// reducer
export default handleActions(
    {
        [GET_PROFILE]: (state, action) =>
        produce(state, (draft) => {
          draft.list = action.payload.profile_list;
        }),
        [SET_PREVIEW]: (state, action) =>
            produce(state, (draft) => {
            draft.preview = action.payload.preview;
        }),
        [EDIT_PROFILE]: (state, action) =>
            produce(state, (draft) => {
            draft.list = action.payload.profile;
        }),
        [EDIT_USERPR]: (state, action) =>
            produce(state, (draft) => {
            draft.list.userPr = action.payload.user_pr.des;
        }),
    },
    initialState
);
  const actionCreators = {
    getProfile,
    setPreview,
    getProfileDB,
    editProfileImgDB,
    editUserPrDB,
};
export { actionCreators };