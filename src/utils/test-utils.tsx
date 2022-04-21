import { render as rtlRender } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import UserReducer from "../store/user-slice";
import QueryReducer from "../store/query-slice";

function render(
  ui: React.ReactElement,
  {
    store = configureStore({ reducer: { user: UserReducer, query: QueryReducer }}),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

export * from '@testing-library/react'
export { render }