import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import configurationApi from '../../api/configuration';
import { Configuration } from '../../types/configuration.type';

export interface ConfigurationState {
  config: Configuration | null;
  loading: boolean;
}

const initialState: ConfigurationState = {
  config: null,
  loading: false,
};

export const getConfiguration = createAsyncThunk(
  'app/getConfiguration',
  async (_, { rejectWithValue }) => {
    try {
      return await configurationApi.getAppConfiguration();
    } catch (error) {
      return rejectWithValue((error as any).response);
    }
  },
);

export const configurationReducer = createSlice({
  name: 'configuration',
  initialState,
  reducers: {},
  extraReducers: {
    [getConfiguration.pending as any]: (state: ConfigurationState) => {
      state.loading = true;
    },
    [getConfiguration.fulfilled as any]: (state, action) => {
      state.loading = false;
      state.config = action.payload;
    },
  },
});

export default configurationReducer.reducer;
