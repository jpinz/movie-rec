import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import MediaTypeOptions from '../../models/MediaTypeOptions';

export interface MediaTypeState {
    choice: MediaTypeOptions
}

const initialState: MediaTypeState = {
    choice: MediaTypeOptions.Movie,
}

export const mediaTypeSlice = createSlice({
    name: 'mediaType',
    initialState,
    reducers: {
        setMediaType: (state, action: PayloadAction<MediaTypeOptions>) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.choice = action.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const { setMediaType } = mediaTypeSlice.actions

export default mediaTypeSlice.reducer