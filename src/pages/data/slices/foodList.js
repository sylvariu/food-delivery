import { createSlice } from '@reduxjs/toolkit'

export const foodItemsSlice = createSlice({
    name: 'foodItems',
    initialState: {
        items: [],
        loading: true
    },
    reducers: {
        setFoodItems: (state, action) => {
            state.items = action.payload;
            state.loading = false;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        }
    }
});

export const { setFoodItems, setLoading } = foodItemsSlice.actions;
export default foodItemsSlice.reducer;