import { combineReducers } from "redux";

import { boardReducer } from "./boardReducer";
import { enemyReducer } from "./enemyReducer";

export default combineReducers({
    board: boardReducer,
    enemies: enemyReducer
});