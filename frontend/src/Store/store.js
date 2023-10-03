import { configureStore } from '@reduxjs/toolkit';
import dataReducer from '../Reducer/dataReducer';

export default configureStore({
  reducer: {
    datas: dataReducer
  }
});