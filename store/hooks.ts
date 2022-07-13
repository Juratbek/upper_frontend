import { Dispatch } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { TDispatch, TRootState } from './store';

export const useAppDispatch = (): Dispatch => useDispatch<TDispatch>();
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;
