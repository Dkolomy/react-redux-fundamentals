import { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"

type Filters = {
  status: string
  colors: string[]
}

type FiltersState = {
  filters: Filters
}

const initialState: FiltersState = {
  filters: {
    status: 'All',
    colors: []
  }
}

export const filtersSlice = createAppSlice({
  name: 'filters',
  initialState,
  reducers: {
    statusFilterChanged: (state, action: PayloadAction<string>) => {
      state.filters.status = action.payload
    },
    colorFilterChanged: (state, action: PayloadAction<string[]>) => {
      state.filters.colors = action.payload
    },
  }
})

export const { statusFilterChanged, colorFilterChanged } = filtersSlice.actions
export default filtersSlice.reducer
