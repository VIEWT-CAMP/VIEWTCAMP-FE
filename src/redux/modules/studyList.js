import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import api from "../../shared/api.jsx";

// actions
const SET_ROOM = "SET_ROOM";
const GET_ROOM = "GET_ROOM";
const GET_ROOM_ALL = "GET_ROOM_ALL";
const GET_ROOM_MAIN = "GET_ROOM_MAIN";
const GET_USER_MAIN = "GET_USER_MAIN";
const GET_STUDY_LIST = "GET_STUDY_LIST";
const HOST_GET_ROOM_ALL = "HOST_GET_ROOM_ALL";
const CREATE_ROOM = "CREATE_ROOM";
const CLEAR_TAG = "CLEAR_TAG"
const CLEAR_SEARCH = "CLEAR_SEARCH"
const GET_ROOM_SEARCH = "GET_ROOM_SEARCH";

// action creators
const setRoom = createAction(SET_ROOM, (tag_list) => ({ tag_list })); // 로그인 - user정보, 로그인상태 변경
const getRoom = createAction(GET_ROOM, (room_list) => ({ room_list })); // 로그인 - user정보, 로그인상태 변경
const getRoomAll = createAction(GET_ROOM_ALL, (room_list) => ({ room_list })); // 로그인 - user정보, 로그인상태 변경
const getRoomMain = createAction(GET_ROOM_MAIN, (main_list) => ({ main_list })); // 로그인 - user정보, 로그인상태 변경
const getuserMain = createAction(GET_USER_MAIN, (user_list) => ({ user_list })); // 로그인 - user정보, 로그인상태 변경
const getStudyList = createAction(GET_STUDY_LIST, (study_list, recruit, tag1, tag2, tag3, keyword) => ({ study_list, recruit, tag1, tag2, tag3, keyword })); // 로그인 - user정보, 로그인상태 변경
const hostGetRoomAll = createAction(HOST_GET_ROOM_ALL, (host_room_list) => ({ host_room_list })); // 로그인 - user정보, 로그인상태 변경
const createRoom = createAction(CREATE_ROOM, (room) => ({room}));
const clearTagList = createAction(CLEAR_TAG, (tag_list) => ({tag_list}));
const clearSearchList = createAction(CLEAR_SEARCH, (search_list) => ({search_list}));
const getRoomSearch = createAction(GET_ROOM_SEARCH, (search_list ,keyword) => ({ search_list, keyword })); // 로그인 - user정보, 로그인상태 변경

// initialState
const initialState = {
  host_room_list : [],
  tag_list: [],
  room_list: [],
  main_list: [],
  search_list: [],
  study_list:[],
  is_loading: false,
  next: true,
  paging: 1,
  recruit:[],
  tag1:[],
  tag2:[],
  tag3 :[],
  keyword:[],
};
const createRoomDB = (RoomTitle, NumPeople, Ability, Company, Type) => {
    return function (dispatch, getState, {history}) {
        const token = sessionStorage.getItem("Authorization");
        try {
          api
              .post("/room", {
                    title: RoomTitle,
                    maxUser:NumPeople,
                    tag1: Ability,
                    tag2: Company,
                    tag3: Type
                }, {
                    headers: {
                        Authorization: token
                    }
                })
                .then((res) => {
                    dispatch(createRoom(res.data))
                    const roomid = res.data.roomId
                    history.push(`/videoCheck/${roomid}`)
                  })
                } catch (err) {
                  alert("방만들기 실패");
        };
    };
};
// ** 생성된 방 정보 가져오기
const setRoomDB = (page, tag1, tag2, tag3) => {
  return async function (dispatch, getState, { history }) {
    await api.get(`/room-page/${page}/6/${tag1}/${tag2}/${tag3}`
      ).then((res) => {
        dispatch(setRoom(res.data));
      })
      .catch((error) => console.log(error));
  };
};
const getRoomAllDB = (page) => {
  return async function (dispatch, getState, { history }) {
    await api.get(`/room-page/${page}/6`
    )
    .then((res) => {
        dispatch(getRoomAll(res.data));
      })
      .catch((error) => console.log(error));
  };
};
const getRoomMainDB = () => {
  return async function (dispatch, getState, { history }) {
    await api.get('/room'
    )
    .then((res) => {
        dispatch(getRoomMain(res.data));
      })
      .catch((error) => console.log(error));
  };
};
const getRoomSearchDB = (page, keyword) => {
  return async function (dispatch, getState, {history}) {
    await 
    api.get(`/room-page/${page}/6/${keyword}`)
    .then((res)=>{
      dispatch(getRoomSearch(res.data, keyword));
    })
    .catch((error)=>console.log(error))
  };
};

const getStudyListDB = (page, recruit, tag1, tag2, tag3, keyword) => {
  return async function (dispatch, getState, {history}) {
    await 
    api.get(`/room-page/${page}/6/createdAt/${recruit}/${tag1}/${tag2}/${tag3}/${keyword}`)
    .then((res)=>{
      dispatch(getStudyList(res.data, recruit, tag1, tag2, tag3, keyword));
    })
    .catch((error)=>console.log(error))
  };
};

const hostGetRoomAllDB = () => {
  return async function (dispatch, getState, { history }) {
    const token = sessionStorage.getItem("Authorization");
    await api.get(`/room/all`,{
      headers: {
        Authorization: token
    }})
    .then((res) => {
        dispatch(hostGetRoomAll(res.data));
      })
      .catch((error) => console.log(error));
  };
};

export default handleActions(
  {
    [CREATE_ROOM]: (state, action) => produce(state, (draft) => {
      draft.room_list=action.payload.room;
    }),
    [SET_ROOM]: (state, action) =>
      produce(state, (draft) => {
        draft.tag_list = action.payload.tag_list
        draft.search_list = []
      }),
    [GET_ROOM_ALL]: (state, action) =>
      produce(state, (draft) => {
        draft.room_list = action.payload.room_list;
      }),
    [GET_ROOM_MAIN]: (state, action) =>
      produce(state, (draft) => {
        draft.main_list = action.payload.main_list;
      }),
    [GET_ROOM_SEARCH]: (state, action) =>
      produce(state, (draft) => {
        draft.search_list = action.payload.search_list;
        draft.keyword = action.payload.keyword;
     
        draft.tag_list = []
      }),
    [GET_STUDY_LIST]: (state, action) =>
      produce(state, (draft) => {
        draft.study_list = action.payload.study_list;
        draft.recruit = action.payload.recruit;
        draft.tag1 = action.payload.tag1;
        draft.tag2 = action.payload.tag2;
        draft.tag3 = action.payload.tag3;
        draft.keyword = action.payload.keyword;
      }),
    [HOST_GET_ROOM_ALL]: (state, action) =>
    produce(state, (draft) => {
      draft.host_room_list = action.payload.host_room_list;
    }),
    [CLEAR_TAG] : (state, action) => produce(state, (draft) => { draft.tag_list =[]}),
    [CLEAR_SEARCH] : (state, action) => produce(state, (draft) => { draft.search_list =[]}),
},
  initialState
);
const actionCreators = {
    setRoom,
    getRoomAll,
    getRoomMain,
    setRoomDB,
    getRoomAllDB,
    getRoomMainDB,
    createRoomDB,
    getStudyListDB,
    hostGetRoomAll,
    hostGetRoomAllDB,
    clearTagList,
    getRoomSearchDB,
    clearSearchList,
};
export { actionCreators };