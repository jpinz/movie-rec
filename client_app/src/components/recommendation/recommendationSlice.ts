import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import providerSlice from '../provider/providerSlice';

export interface IMovie {
    id: number,
    title: string,
    poster_path: string
}

export interface IShow {
    id: number,
    name: string,
    poster_path: string
}

export interface RecommendationState {
    movieOptions: IMovie[]
    showOptions: IShow[]
}

const initialState: RecommendationState = {
    movieOptions: [],
    showOptions: []
}

export const recommendationSlice = createSlice({
    name: 'recommendation',
    initialState,
    reducers: {
        populateMovies: (state, action: PayloadAction<IMovie[]>) => {
            state.movieOptions = action.payload;
        },
        populateShows: (state, action: PayloadAction<IShow[]>) => {
            state.showOptions = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { populateMovies, populateShows } = recommendationSlice.actions

export default recommendationSlice.reducer