import React, { useState, useEffect } from 'react';
import { getAccessToken, getUserLocal, removeAccessToken, removeFCMToken } from '../../storage';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '../../redux/auth/authSlice';
import AuthContext from './AuthContext';
import { updateFCMToken } from '../../api/auth';

const AuthState = (props) => {
    const dispatch = useDispatch();

    const [userToken, setUserToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        checkAuthenticationStatus()
    }, [])

    const checkAuthenticationStatus = async () => {
        try {
            const token = await getAccessToken();
            const user = await getUserLocal();
            dispatch(setUser({ user }));
            dispatch(setToken({ token }));
            await updateFCMToken();
            setUserToken(token);
        } catch (err) {
        }
        setIsLoading(false)
    }

    const onAuthentication = async (token) => {
        await updateFCMToken();
        setUserToken(token);
    }

    const userSignOut = async () => {
        console.log('userSignOut');
        await removeAccessToken();
        await removeFCMToken();
        setUserToken(null);
    }

    return (
        <AuthContext.Provider
            value={{
                onAuthentication,
                userToken,
                isLoading,
                userSignOut,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;