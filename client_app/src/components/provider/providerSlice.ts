import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RadioChangeEvent } from 'antd';

export interface IProvider {
    display_priority: number,
    logo_path: string,
    provider_name: string,
    provider_id: number
}

export interface ProviderState {
    choices: number[]
    purchaseOption: any
    options: IProvider[]
}

const initialState: ProviderState = {
    choices: [],
    purchaseOption: '',
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
        selectPurchaseOption: (state, action: PayloadAction<string>) => {
            if(action.payload == 'any') {
                state.purchaseOption = '';
            } else {
                state.purchaseOption = action.payload;
            }
        },
    },
})

// Action creators are generated for each case reducer function
export const { selectProvider, populateProviders, selectPurchaseOption } = providerSlice.actions

export default providerSlice.reducer