import {createAction, handleActions} from "redux-actions";
import {produce} from "immer";
import axios from "axios";

import api from "../../shared/api.jsx";

// actions
const GET_QUESTION = "GET_QUESTION";
const GET_ROOM_QUESTION = "GET_ROOM_QUESTION";
const ADD_QUESTION = "ADD_QUESTION";
const DELETE_QUESTION = "DELETE_QUESTION";
// action creators
const getQuestion = createAction(GET_QUESTION, (question) => ({question}));
const getRoomQuestion = createAction(GET_ROOM_QUESTION, (question) => ({question}));
const addQuestion = createAction(ADD_QUESTION, (question) => ({question}));
const deleteQuestion = createAction(DELETE_QUESTION, (question_id) => ({question_id}));
const initialState = {
    question_list: [],
    questionRoomList: []
};
// middleware
const getQuestionDB = () => {
    return async function (dispatch, getState, {history}) {
        const token = sessionStorage.getItem("Authorization");
        try {
            await api.get("/user-questions",{
                    headers: {
                        Authorization: token
                    }
                })
                .then((res) => {
                    dispatch(getQuestion(res.data)
                )})
                .catch((error) => console.log(error));
        } catch (err) {
            alert("예상질문을 불러오는데에 실패했습니다.");
        };
    };
};
const getRoomQuestionDB = (username) => {
    return async function (dispatch, getState, {history}) {
        const token = sessionStorage.getItem("Authorization");
        try {
            await api.get(`/room/question/${username}`,{
                    headers: {
                        Authorization: token
                    }
                })
                .then((res) => {
                    dispatch(getRoomQuestion(res.data)
                )})
                .catch((error) => console.log(error));
        } catch (err) {
            alert("예상질문을 불러오는데에 실패했습니다.");
        };
    };
};
const addQuestionDB = (question,username) => {
    return async function(dispatch, getState, {history}) {
        const token = sessionStorage.getItem("Authorization");
      const data = {
        question : question
      }

      await api.post("/user-question",
      data,{
          headers: {
            Authorization: token
          }
        }
      )
     .then((res) => {
      dispatch(addQuestion(res.data),
      
       api.get(`/room/question/${username}`,{
        headers: {
            Authorization: token
        }
    })
    .then((res) => {
        dispatch(getRoomQuestion(res.data)
    )})
    .catch((error) => console.log(error))

      )})
      .catch((err) => {
        alert("메뉴를 선택해주세요")
        console.log("댓글추가실패", err);
      })
    }
  }
  const deleteQuestionDB = (id) => {
    return async function (dispatch, getState, {history}){
        const token = sessionStorage.getItem("Authorization");
      await api.delete(`/user-questions/${id}`,{
        headers: {
            Authorization: token
        }
        })
        .then((response) => {
        dispatch(deleteQuestion(id))
        })
        .then((res)=>{
          const _question = getState().question.question_list;
          const _deleteQuestion = _question.filter((c, i)=>{
            return parseInt(c.id) !== id;
          })
          dispatch(getQuestion(_deleteQuestion)
        )})
        .catch((err) => {
        console.log("삭제실패");
        })
    }
    }
export default handleActions({
    [GET_QUESTION]: (state, action) => produce(state, (draft) => {
        draft.question_list = action.payload.question
    }),
    [GET_ROOM_QUESTION]: (state, action) => produce(state, (draft) => {
        draft.questionRoomList = action.payload.question
    }),
    [ADD_QUESTION]: (state, action) => produce(state, (draft) => {
             draft.question_list.push(action.payload.question);
    }),
}, initialState);
const actionCreators = {
    getQuestion,
    getQuestionDB,
    addQuestionDB,
    deleteQuestionDB,
    getRoomQuestion,
    getRoomQuestionDB
};
export {
    actionCreators
};