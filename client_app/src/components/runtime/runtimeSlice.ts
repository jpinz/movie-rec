import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IRuntime {
    greaterThan: number,
    lessThan: number | undefined,
}
export interface RuntimeState {
    runtime: IRuntime
}

const initialState: RuntimeState = {
    runtime: {greaterThan: 60, lessThan: 120}
}

export const runtimeSlice = createSlice({
    name: 'runtime',
    initialState,
    reducers: {
        setGreaterThan: (state, action: PayloadAction<number>) => {
            state.runtime.greaterThan = action.payload;
        },
        setLessThan: (state, action: PayloadAction<number>) => {
            if(action.payload === 240) {
                state.runtime.lessThan = undefined;
            } else {
                state.runtime.lessThan = action.payload;
            }
        },
    },
})

// Action creators are generated for each case reducer function
export const { setGreaterThan, setLessThan } = runtimeSlice.actions

export default runtimeSlice.reducer