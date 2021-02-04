import { createStore } from 'redux';
import {boardReducer} from "./boardReducer";

export const store = createStore(boardReducer);