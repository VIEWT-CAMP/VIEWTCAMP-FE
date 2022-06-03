import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import "moment/locale/ko";
import * as dateFns from "date-fns";
import jwtDecode from "jwt-decode";

// actions
const GET_CHAT = "GET_CHAT";
const SEND_CHAT = "SEND_CHAT";
const CLEAR_CHAT = "CLEAR_CHAT";
const BAN_CHAT = "BAN_CHAT";
const STATUS_CHAT = "STATUS_CHAT";

// action creators
const getChat = createAction(GET_CHAT, (chat) => ({ chat }));
const clearChat = createAction(CLEAR_CHAT, (chat) => ({ chat }));
const banChat = createAction(BAN_CHAT, (chatlist,myName) => ({ chatlist,myName}));
const statusChat = createAction(STATUS_CHAT, (chatStatus) => ({ chatStatus}));

// initialState
export const initialState = {
  list: [],
  roomStatus : []
};
// middleware actions

export default handleActions(
  {
    [GET_CHAT]: (state, action) =>
      produce(state, (draft) => {

        const nowaTime = dateFns.format(new Date(), "hh:mm")
        draft.list.push({ ...action.payload.chat, time: nowaTime });
      }),
    [SEND_CHAT]: (state, action) =>
      produce(state, (draft) => {
      }),

      [CLEAR_CHAT] : (state, action) => produce(state, (draft) => { draft.list =[]}),
     
    [BAN_CHAT]: (state, action) =>
    produce(state, (draft) => {
      const token = sessionStorage.getItem("Authorization");
      const userName = jwtDecode(token).USER_NAME;
      const m = action.payload.chatlist;
           

      if (m.type === "BAN") {
        if (userName === m.banUsername) {
          
          alert(
              "해당 채팅방에서 퇴장처리되었어요."
            )

             window.location.replace(`/review/${m.roomId}/${m.roomTitle}`);
            
        } else {
          let idx = draft.list.findIndex(
            (u) => parseInt(u.user_id) === parseInt(m.message)
          );
          if (idx !== -1) {
            draft.list.splice(idx, 1);
          }
          return;
        }
      }
    }),
    [STATUS_CHAT]: (state, action) =>
      produce(state, (draft) => {
        draft.roomStatus = action.payload.chatStatus
      }),

  },
  initialState
);

const actionCreators = {
  getChat,
  clearChat,
  banChat,
  statusChat
};

export { actionCreators };