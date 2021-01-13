import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import user, { userInter } from "./user";
//redux调试工具
import { composeWithDevTools } from "redux-devtools-extension";
export interface storeType {
  user: userInter;
  [propsName: string]: any;
}
const rootReduer = combineReducers({
  user,
});

export default createStore(
  rootReduer,
  composeWithDevTools(applyMiddleware(thunk))
);
// export default createStore(rootReduer, applyMiddleware(thunk));
