import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import dataReducer from '../Reducer/dataReducer';

import { dataApiSlice } from '../Api/dataApi';

export default configureStore({
  reducer: {
    datas: dataReducer,
    [dataApiSlice.reducerPath]: dataApiSlice.reducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(dataApiSlice.middleware)
});