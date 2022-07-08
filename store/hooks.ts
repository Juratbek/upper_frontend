import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { TDispatch, TRootState } from './store';

export const useAppDispatch = (): any => useDispatch<TDispatch>();
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;
