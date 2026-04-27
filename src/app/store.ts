import todoSlice from "../features/todo/todoSlice"
import filtersSlice from "../features/filters/filtersSlice"
// import { composeWithDevTools } from "redux-devtools-extension"
import { configureStore } from "@reduxjs/toolkit"

const store = configureStore({
  reducer: {
    todos: todoSlice,
    filters: filtersSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
