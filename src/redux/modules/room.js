import {createAction, handleActions} from "redux-actions";
import axios from "axios";
import {produce} from "immer";
import api from "../../shared/api"

// actions
const ENTER_ROOM = "ENTER_ROOM";
const QUIT_ROOM = "QUIT_ROOM";
// action creators
const enterRoom = createAction(ENTER_ROOM, (roomId) => ({roomId}));
const quitRoom = createAction(QUIT_ROOM, (roomInfo) => ({roomInfo}));
const initialState = {
    room_list: []
};
const enterRoomDB = (roomId) => {
    return async function (dispatch, getState, {history}) {
        const token = sessionStorage.getItem("Authorization");
        await api
                .post(`/user-enter`,{
                    roomId:roomId
                },
                {
                    headers: {
                        Authorization: token
                    }
                })
                .then((res) => {
                    console.log("방들어가기 성공!");
                })
        .catch ((err) => {
            alert("입장이 불가한 방입니다.");
            console.log(err)
            history.push("/");
        });
    };
};
const quitRoomDB = (roomId,roomTitle) => {
    return async function (dispatch, getState, {history}) {
        const token = sessionStorage.getItem("Authorization");
        await api
                .delete(`/user-quit/${roomId}`,{
                    headers: {
                        Authorization: token
                    }
                })
                .then((res) => {
                    dispatch(quitRoom(roomId,roomTitle))
                    history.push(`/review/${roomId}/${roomTitle}`)
                })
         .catch ((err) => {
            console.log("방나가기 실패!");
        })
    };
};
export default handleActions({
    [QUIT_ROOM]: (state, action) => produce(state, (draft) => {
        draft.room_list = action.payload.roomInfo
    }),
}, initialState);
const actionCreators = {
    enterRoomDB,
    quitRoomDB,
};
export {
    actionCreators
};