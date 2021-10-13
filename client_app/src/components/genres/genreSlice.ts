import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface GenreState {
    wanted: IGenre[],
    not_wanted: IGenre[],
}

const initialState: GenreState = {
    wanted: [],
    not_wanted: []
}

export const genreSlice = createSlice({
    name: 'genre',
    initialState,
    reducers: {
        addWanted: (state, action: PayloadAction<IGenre>) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.wanted.push(action.payload);
        },
        addNotWanted: (state, action: PayloadAction<IGenre>) => {
            state.not_wanted.push(action.payload);
        },
        removeWanted: (state, action: PayloadAction<IGenre>) => {
            state.wanted = state.wanted.filter(genre => genre.id !== action.payload.id);
        },
        removeNotWanted: (state, action: PayloadAction<IGenre>) => {
            state.not_wanted = state.not_wanted.filter(genre => genre.id !== action.payload.id);
        },
    },
})

// Action creators are generated for each case reducer function
export const { addWanted, addNotWanted, removeWanted, removeNotWanted } = genreSlice.actions

export default genreSlice.reducer