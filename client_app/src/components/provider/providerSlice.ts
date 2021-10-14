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
        selectProvider: (state, action: PayloadAction<number>) => {
            let exists = state.choices.indexOf(action.payload) !== -1;
            if(exists) {
                state.choices = state.choices.filter(id => id !== action.payload);
            } else {
                state.choices.push(action.payload);
            }
        },
        populateProviders: (state, action: PayloadAction<IProvider[]>) => {
            state.options = action.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const { selectProvider, populateProviders } = providerSlice.actions

export default providerSlice.reducer