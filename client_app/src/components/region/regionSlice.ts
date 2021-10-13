import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import MediaTypeOptions from '../../models/MediaTypeOptions';

export interface RegionState {
    countryCode: string
}

const initialState: RegionState = {
    countryCode: "US"
}

export const regionSlice = createSlice({
    name: 'region',
    initialState,
    reducers: {
        setRegion: (state, action: PayloadAction<string>) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.countryCode = action.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const { setRegion } = regionSlice.actions

export default regionSlice.reducer