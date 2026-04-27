import { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"

export const STATUS_FILTERS = {
  All: 'all',
  Active: 'active',
  Completed: 'completed',
}

export const AVAILABLE_COLORS = ['red', 'green', 'blue', 'purple', 'orange']

export const capitalize = (s: string) => s[0].toUpperCase() + s.slice(1)

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
    colorFilterChanged: (state, action: PayloadAction<{color: string, changeType: 'added' | 'removed'}>) => {
      const { color, changeType } = action.payload
      if (changeType === 'added') {
        state.filters.colors.push(color)
      } else {
        state.filters.colors = state.filters.colors.filter(c => c !== color)
      }
    },
  }
})

export const { statusFilterChanged, colorFilterChanged } = filtersSlice.actions
export default filtersSlice.reducer

export const selectStatus = (state: { filters: FiltersState }) => state.filters.filters.status
export const selectColors = (state: { filters: FiltersState }) => state.filters.filters.colors
