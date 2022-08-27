import { configureStore } from '@reduxjs/toolkit';
import translationsSlice from './reducers/translations/translationsSlice';

const store = configureStore({
  reducer: {
    translations: translationsSlice
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
