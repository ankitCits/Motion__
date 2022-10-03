import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const slice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: null,
        initialRoute: 'Dashboard'
    },
    reducers: {
        setUser: (state, { payload: { user } }) => {
            // console.log('setUser', user);
            state.user = { ...state.user, ...user };
        },
        setToken: (state, { payload: { token } }) => {
            // console.log('setToken', token);
            state.token = { ...state.token, ...token };
        },
        setInitialRoute: (state, { payload: { route } }) => {
            state.initialRoute = route;
        },
    },
});

export const { setUser, setToken, setInitialRoute } = slice.actions;

export default slice.reducer;

export const getUser = state => state.auth.user;
export const getUserToken = state => state.auth.token;
export const getInitialRoute = state => state.auth.initialRoute;
