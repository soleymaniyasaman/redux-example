import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import productList from './productList.json'

export const fetchAllProducts = createAsyncThunk('FETCH_ALL_PRODUCTS', async (apiUrl) => {
    const response = await fetch(apiUrl)
    return response.json()
});

const productSlice = createSlice({
    name: 'products',
    initialState: {
        data: [],
        fetchStatus: ''
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProducts.fulfilled, (state, action) => {
                state.data = action.payload
                state.fetchStatus = 'success'
            })
            .addCase(fetchAllProducts.pending, (state) => {
                state.fetchStatus = 'loading'
            })
            .addCase(fetchAllProducts.rejected, (state) => {
                state.data = productList.product //whenever server is unavailable the page show this product instead of empty page
                state.fetchStatus = 'error'
            })
    }
})

export default productSlice;