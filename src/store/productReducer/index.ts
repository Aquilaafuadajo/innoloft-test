import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import productApi from '../../api/product';
import { Product } from '../../types';

export interface ProductState {
  product: Product | null;
  loading: boolean;
}

const initialState: ProductState = {
  product: null,
  loading: false,
};

export const getProduct = createAsyncThunk(
  'product/getProduct',
  async (id: string, { rejectWithValue }) => {
    try {
      return await productApi.getProduct(id);
    } catch (error) {
      return rejectWithValue((error as any).response);
    }
  },
);

export const updateProduct = createAsyncThunk(
  'product/updateProduct',
  async (data: Product, { rejectWithValue, dispatch }) => {
    try {
      const result = await productApi.updateProduct(data);

      dispatch(getProduct(data.id as string));

      return result;
    } catch (error) {
      return rejectWithValue((error as any).response);
    }
  },
);

export const productReducer = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: {
    [getProduct.pending as any]: (state: ProductState) => {
      state.loading = true;
    },
    [getProduct.fulfilled as any]: (state, action) => {
      state.loading = false;
      state.product = action.payload;
    },
  },
});

export default productReducer.reducer;
