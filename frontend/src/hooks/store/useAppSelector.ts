import { useSelector } from 'react-redux';

import type { RootState } from '@/store';
import type { TypedUseSelectorHook } from 'react-redux';


/**
 * 类型安全的selector hook
 * @type {TypedUseSelectorHook<RootState>} 类型安全的selector函数
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
