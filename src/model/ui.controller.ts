import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { STORE_BODY_ID } from 'contant'

/**
 * Interface & Utility
 */

export type UIState = {
  width: number
}

const getStoreBodyWidth = () => {
  const ctxBody = document.getElementById(STORE_BODY_ID)
  if (!ctxBody) return window.innerWidth
  const ctxBounding = ctxBody.getBoundingClientRect()

  return ctxBounding.width
}

/**
 * Store constructor
 */

const NAME = 'ui'
const initialState: UIState = {
  width: window.innerWidth,
}

/**
 * Actions
 */

export const resize = createAsyncThunk(`${NAME}/resize`, async () => {
  const width = getStoreBodyWidth()
  return { width }
})

/**
 * Usual procedure
 */

const slice = createSlice({
  name: NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    void builder.addCase(
      resize.fulfilled,
      (state, { payload }) => void Object.assign(state, payload),
    ),
})

export default slice.reducer
