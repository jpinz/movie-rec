import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ContentRatingState {
    choices: number[]
}

const initialState: ContentRatingState = {
    choices: [1],
}

export const contentRatingSlice = createSlice({
    name: 'contentRating',
    initialState,
    reducers: {
        addContentRating: (state, action: PayloadAction<number>) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.choices.push(action.payload);
        },
        removeContentRating: (state, action: PayloadAction<number>) => {
            state.choices = state.choices.filter(id => id !== action.payload);
        },
    },
})

// Action creators are generated for each case reducer function
export const { addContentRating, removeContentRating } = contentRatingSlice.actions

export default contentRatingSlice.reducer