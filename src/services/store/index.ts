import { configureStore } from '@reduxjs/toolkit';
import tableReducer from '../slices/table';
import {
	TypedUseSelectorHook,
	useDispatch as dispatchHook,
	useSelector as selectorHook,
} from 'react-redux';

export const store = configureStore({
    reducer: {
        table: tableReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
