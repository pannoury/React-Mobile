import { configureStore } from '@reduxjs/toolkit';

/******************* Redux States *******************/
import callSettingsSlice from './callSettings';
import { chatSlice } from './chat';
/****************************************************/

const store = configureStore({ 
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
  reducer: {
    chatReducer: chatSlice,
    callSettingReducer: callSettingsSlice
  },
})

export default store;