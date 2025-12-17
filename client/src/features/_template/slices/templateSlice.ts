import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface TemplateState {
  data: string[]
  loading: boolean
  error: string | null
}

const initialState: TemplateState = {
  data: [],
  loading: false,
  error: null,
}

const templateSlice = createSlice({
  name: 'template',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setData: (state, action: PayloadAction<string[]>) => {
      state.data = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
})

export const { setLoading, setData, setError } = templateSlice.actions
export default templateSlice.reducer

