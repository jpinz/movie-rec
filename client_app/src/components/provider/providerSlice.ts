import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProvidersAPI } from '../../api/api';

export interface IProvider {
    display_priority: number,
    logo_path: string,
    provider_name: string,
    provider_id: number
}
export interface ProviderState {
    choices: number[]
    options: IProvider[]
}

const initialState: ProviderState = {
    choices: [],
    options: []
}

export const providerSlice = createSlice({
    name: 'provider',
    initialState,
    reducers: {
        addProvider: (state, action: PayloadAction<number>) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.choices.push(action.payload);
        },
        removeProvider: (state, action: PayloadAction<number>) => {
            state.choices = state.choices.filter(id => id !== action.payload);
        },
        populateProviders: (state, action: PayloadAction<IProvider[]>) => {
            state.options = action.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const { addProvider, removeProvider, populateProviders } = providerSlice.actions

export default providerSlice.reducer