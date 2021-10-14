import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { ProvidersAPI } from '../../api/api';

export interface IProvider {
    display_priority: number,
    logo_path: string,
    provider_name: string,
    provider_id: number
}

export interface ProviderState {
    choices: number[]
    rent: boolean
    buy: boolean
    options: IProvider[]
}

const initialState: ProviderState = {
    choices: [],
    rent: false,
    buy: false,
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
        selectRentBuy: (state, action: PayloadAction<CheckboxValueType[]>) => {
            if(action.payload.indexOf("Rent") !== -1) {
                state.rent = true;
            } else {
                state.rent = false;
            }
            if(action.payload.indexOf("Buy") !== -1) {
                state.buy = true;
            } else {
                state.buy = false;
            }
        },
    },
})

// Action creators are generated for each case reducer function
export const { selectProvider, populateProviders, selectRentBuy } = providerSlice.actions

export default providerSlice.reducer