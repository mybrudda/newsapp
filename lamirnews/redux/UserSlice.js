import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    displayName: '',
    uid: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.displayName = action.payload.displayName;
            state.uid = action.payload.uid;
        },
        logoutUser: (state) => {
            state.displayName = '';
            state.uid = '';
        },
    },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;