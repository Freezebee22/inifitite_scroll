import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:2000/records';

interface TableState {
    items: Record<string, any>[];
    page: number;
}

const initialState: TableState = {
    items: [],
    page: 1,
};

export const fetchData = createAsyncThunk(
    'table/fetchData',
    async (_, { getState }) => {
        const { page } = (getState() as any).table;
        const response = await axios.get(`${API_URL}?_page=${page}&_limit=30`);
        return response.data;
    }
);

export const addItem = createAsyncThunk(
    'table/addItem',
    async (item: Record<string, string>) => {
        const response = await axios.post(API_URL, item);
        return response.data;
    }
);

const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchData.fulfilled, (state, action: PayloadAction<any[]>) => {
            state.items = [...state.items, ...action.payload];
            state.page += 1;
        });
        builder.addCase(addItem.fulfilled, (state, action: PayloadAction<any>) => {
            state.items.unshift(action.payload);
        });
    },
});

export const selectItems = (state: { table: TableState }) => state.table.items;
export default tableSlice.reducer;
