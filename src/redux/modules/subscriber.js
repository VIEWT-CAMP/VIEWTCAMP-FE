import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

// actions
const GET_SUBSCRIBERS = "GET_SUBSCRIBERS";
const LEAVE_SUBSCRIBERS = "LEAVE_SUBSCRIBERS";
const START_SUBSCRIBERS = "START_SUBSCRIBERS";
// action creators

const getSubscribers = createAction(GET_SUBSCRIBERS, (subscriber) => ({
  subscriber,
}));
const leaveSubscribers = createAction(LEAVE_SUBSCRIBERS, (subscriber) => ({
  subscriber,
}));
const startSubscribers = createAction(START_SUBSCRIBERS, (subscriber) => ({
  subscriber,
}));

// initialState
export const initialState = {
  subscribers: [],
};
// middleware actions

export default handleActions(
  {
    [GET_SUBSCRIBERS]: (state, action) =>
      produce(state, (draft) => {      
        if (Array.isArray(action.payload.subscriber)) {
          draft.subscribers = [...action.payload.subscriber];
        } else if (typeof action.payload.subscriber === "object") {
          const check = draft.subscribers.filter(
            (item) =>
              item.nickname ===
              action.payload.subscriber.message.split("님이")[0]
          );
          if (check.length <= 0) {
            draft.subscribers.push({
              nickname: action.payload.subscriber.message.split("님이")[0],
              profileImg: action.payload.subscriber.profileImg,
            });
          }
        }
      }),
    [LEAVE_SUBSCRIBERS]: (state, action) =>
      produce(state, (draft) => {
        let dummyIndex = draft.subscribers.findIndex(
          (item) =>
            item.nickname === action.payload.subscriber.message.split("님이")[0]
        );
        draft.subscribers.splice(dummyIndex, 1);
      }),
      [START_SUBSCRIBERS]: (state, action) =>
      produce(state, (draft) => {
        draft.subscribers.push({
          nickname: action.payload.subscriber.message,
          profileImg: action.payload.subscriber.profileImg,
      })
    }),
},
  initialState
);

const actionCreators = {
  getSubscribers,
  leaveSubscribers,
  startSubscribers
};

export { actionCreators };