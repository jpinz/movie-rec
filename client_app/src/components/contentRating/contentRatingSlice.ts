import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ContentRatingAPI } from '../../api/api';

export interface IContentRating {
    certification: string,
    meaning: string,
    order: number
}
export interface ContentRatingState {
    choices: number[]
    options: IContentRating[]
}

const initialState: ContentRatingState = {
    choices: [1],
    options: []
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
        populateContentRatings: (state, action: PayloadAction<IContentRating[]>) => {
            state.options = action.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const { addContentRating, removeContentRating, populateContentRatings } = contentRatingSlice.actions

export default contentRatingSlice.reducer