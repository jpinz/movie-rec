import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IPage {
    number: number,
    name: string,
    description: string,
}

export interface PageState {
    page: number
}

const initialState: PageState = {
    page: 1
}

export const footerSlice = createSlice({
    name: 'footer',
    initialState,
    reducers: {
        selectPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload
        },
        nextPage: (state) => {
            state.page++;
        },
        prevPage: (state) => {
            state.page--;
        },
    },
})

// Action creators are generated for each case reducer function
export const { selectPage, nextPage, prevPage } = footerSlice.actions

export default footerSlice.reducer