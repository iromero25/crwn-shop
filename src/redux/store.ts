import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import rootReducer from "./root-reducer";
import createSagaMiddleware from "redux-saga";
import { fetchCollections } from "./shop/shop.saga";
import { all } from "redux-saga/effects";

const sagaMiddleware = createSagaMiddleware();

const middlewares = [logger, sagaMiddleware];
const store = createStore(rootReducer, applyMiddleware(...middlewares));

function* rootSaga() {
  yield all([fetchCollections]);
}

sagaMiddleware.run(fetchCollections as any);

export default store;
