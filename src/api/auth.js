import { getAccessToken, getFCMToken } from '../storage';
import { BASE_URL } from '../utils';

export const singIn = (postData) => {
    return new Promise(async (resolve, reject) => {
        const postDataStr = JSON.stringify(postData);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: postDataStr,
        };

        fetch(`${BASE_URL}login`, requestOptions)
            .then(result => result.json())
            .then(response => {
                if (response.status == 200) {
                    resolve(response)
                }
                if (response.errors) {
                    reject(response.errors.errors)
                }
            })
            .catch(error => {
                console.log(error);
                reject(error.message)
            });
    });
};


export const singUp = (postData) => {
    return new Promise(async (resolve, reject) => {
        const postDataStr = JSON.stringify(postData);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: postDataStr,
        };
        fetch(`${BASE_URL}register`, requestOptions)
            .then(result => result.json())
            .then(response => {
                console.log("Auth > response", response);
                if (response.status == 200) {
                    resolve(response)
                }
                if (response.errors) {
                    console.log("Auth > 400 Errors >Response", response.errors)
                    reject(response.errors)
                }
            })
            .catch(error => {
                console.log("Auth > catch > error", error);
                reject(error.message)
            });
    });
};

export const userVerifyByMobile = (postData) => {
    return new Promise(async (resolve, reject) => {
        const postDataStr = JSON.stringify(postData);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: postDataStr,
        };

        fetch(`${BASE_URL}verify-by-mobile`, requestOptions)
            .then(result => result.json())
            .then(response => {
                console.log("Auth > mobile otp response => ", response);
                if (response.status == 200) {
                    resolve(response)
                }
                if (response.errors) {
                    console.log("Auth > userVerificationOtp > 400 error", response.errors);
                    reject(response.errors);
                }
            })
            .catch(error => {
                console.log("Auth > userVerificationOtp > catch", error);
                reject(error.message)
            });
    });
};

export const resendOTP = (postData) => {
    return new Promise(async (resolve, reject) => {
        const postDataStr = JSON.stringify(postData);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: postDataStr,
        };

        fetch(`${BASE_URL}resend-mobile-otp`, requestOptions)
            .then(result => result.json())
            .then(response => {
                if (response.status == 200) {
                    resolve(response)
                }
                if (response.errors) {
                    console.log("Auth > resendOTP > 400 error", response.errors)
                    reject(response.errors)
                }
            })
            .catch(error => {
                console.log("Auth > resendOTP > catch", error);
                reject(error.message)
            });
    });
};


export const forgotPasswordByEmail = (postData) => {
    return new Promise(async (resolve, reject) => {
        const postDataStr = JSON.stringify(postData);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: postDataStr,
        };

        fetch(`${BASE_URL}forgotpasswordbyemail`, requestOptions)
            .then(result => result.json())
            .then(response => {
                console.log("Auth > getForgotPasswordByEmail > response => ", response);
                if (response.status == 200) {
                    resolve(response)
                }
                if (response.errors) {
                    console.log("Auth > getForgotPasswordByEmail > 400 error", response.errors);
                    reject(response.errors)
                }
            })
            .catch(error => {
                console.log("Auth > getForgotPasswordByEmail > catch", error);
                reject(error.message)
            });
    });
};

export const updateProfile = (postData) => {
    return new Promise(async (resolve, reject) => {
        const token = await getAccessToken();
        let formdata = new FormData([]);
        formdata.append("first_name", postData.first_name);
        formdata.append("last_name", postData.last_name);
        console.log("REDUX REQ UPLOAD_IMAGE>>", postData.profile)
        if (postData.profile) {
            formdata.append('user_image', {
                uri: postData.profile,
                name: postData.profile,
                type: 'image/jpeg'
            });
        }
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + token
            },
            body: formdata,
        };
        fetch(`${BASE_URL}update-user-profile`, requestOptions)
            .then(result => result.json())
            .then(response => {
                console.log("UPLOAD_IMAGE_API_RESPONSE___", response)
                if (response.status == 200) {
                    resolve(response)
                }
                if (response.errors) {
                    reject(response.errors)
                }
            })
            .catch(error => {
                console.log('updateProfile > Catch > ', error);
                reject(error.message)
            });
    });
};


export const submitForgetPassword = (postData) => {
    return new Promise(async (resolve, reject) => {
        const postDataStr = JSON.stringify(postData);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: postDataStr,
        };

        fetch(`${BASE_URL}forgot-password-update-by-email`, requestOptions)
            .then(result => result.json())
            .then(response => {
                console.log("Auth > forgot-password-update-by-email > response => ", response);
                if (response.status == 200) {
                    resolve(response)
                }
                if (response.errors) {
                    console.log("Auth > forgot-password-update-by-email > 400 error", response.errors);
                    reject(response.errors)
                }
            })
            .catch(error => {
                console.log("Auth > forgot-password-update-by-email > catch", error);
                reject(error.message)
            });
    });
};

export const changeUserPassword = (data) => {
    return new Promise(async (resolve, reject) => {
        const token = await getAccessToken();
        const postDataStr = JSON.stringify(data);
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + token
            },
            body: postDataStr,
        };
        fetch(`${BASE_URL}change-user-password`, requestOptions)
            .then(result => result.json())
            .then(response => {
                if (response.status == 200) {
                    resolve(response)
                }
                if (response.errors) {
                    console.log("Auth > changeUserPassword > 400 error", response.errors);
                    reject(response.errors.errors)
                }
            })
            .catch(error => {
                console.log("Auth > changeUserPassword > catch", error);
                reject(error.message)
            });
    });
};

export const updateFCMToken = () => {
    return new Promise(async (resolve, reject) => {
        const token = await getAccessToken();
        const fcmToken = await getFCMToken();
        console.log('fcmToken>', fcmToken);
        console.log('token>>>', token);
        if (!token || !fcmToken) {
            return;
        }
        const data = {
            fcm_token: fcmToken
        }
        const postDataStr = JSON.stringify(data);
        console.log("FCM_REQ>",postDataStr)
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + token
            },
            body: postDataStr,
        };
        fetch(`${BASE_URL}update-user-fcm-token`, requestOptions)
            .then(result => result.json())
            .then(response => {
                console.log("FCM_RESPONSE>",response)
                if (response.status == 200) {
                    resolve(response)
                }
                if (response.errors) {
                    console.log("Auth > updateFCMToken > 400 error", response.errors);
                    reject(response.errors.errors)
                }
            })
            .catch(error => {
                console.log("Auth > updateFCMToken > catch", error);
                reject(error.message)
            });
    });
};