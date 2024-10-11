import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TData, TFetchData } from "types";
import { transformData } from "utils";

interface IDataState {
  data: TData[];
  searchData: TData[];
}

const initialState: IDataState = {
  data: [],
  searchData: [],
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    getDataRequest(state: IDataState, _action: PayloadAction<string>) {
      state.data = [];
    },
    getDataSuccess(state: IDataState, action: PayloadAction<TFetchData[]>) {
      state.data = [...transformData(action.payload)];
    },
    getSearchDataRequest(_state: IDataState, _action: PayloadAction<string>) {},
    getSearchDataSuccess(
      state: IDataState,
      action: PayloadAction<TFetchData[]>
    ) {
      state.searchData = [...transformData(action.payload)];
    },
  },
});

export const dataActions = dataSlice.actions;

export const dataReducers = dataSlice.reducer;
