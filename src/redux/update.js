import { 
    INPUT_QUES,
    CLEAR_INPUT_QUES,
    SET_IMAGE_URL,
    SET_ANSWER
} from '../constant/constants';

// 初始化state数据
const initialState = {
    InputValue: "",
    image_url: "",
    answer: ""
}

// 通过dispatch action进入
const update = (state = initialState, action) => {
    // 根据不同的action type进行state的更新
    switch(action.type) {
        case INPUT_QUES:
            return Object.assign({}, state, { InputValue: action.ques })
        case SET_IMAGE_URL:
            return Object.assign({}, state, { image_url: action.imgurl })
        case SET_ANSWER:
            return Object.assign({}, state, { answer: action.ans })
        case CLEAR_INPUT_QUES:
            return Object.assign({}, state, { InputValue: '' })
        default:
            return state
    }
}

export default update