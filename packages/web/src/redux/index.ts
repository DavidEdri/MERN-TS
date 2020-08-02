import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { useSelector, TypedUseSelectorHook } from "react-redux";
import logger from "redux-logger";
import reducer from "./reducer";
import { isProduction } from "../helpers/functions";

const defaultMiddleware = getDefaultMiddleware({ serializableCheck: false });
const middleware = isProduction()
  ? [...defaultMiddleware]
  : [...defaultMiddleware, logger];

const store = configureStore({
  reducer,
  middleware,
  devTools: !isProduction(),
});

export type RootState = ReturnType<typeof store.getState>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useGuaranteedUserSelector = () =>
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  useTypedSelector((state) => state.auth.user!);

export default store;
