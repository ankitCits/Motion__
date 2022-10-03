import { getAccessToken } from '../storage';
import { BASE_URL } from '../utils';

const tempToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMzE3MTQyMWM5Y2Q0NjBhNjM5NThhN2NmZjdmMTE5N2IyNmMzOGI1N2JmNmVhZTAzZWE4NTljNmEzMDgxMDIyNmFmMDNhZmZmMjE2ZTZkODkiLCJpYXQiOjE2NjA0NTg5ODQuMzg3MjUzLCJuYmYiOjE2NjA0NTg5ODQuMzg3MjU3LCJleHAiOjE2OTE5OTQ5ODQuMzg1NTc3LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.MQd4OE1PZBTu_3FU0S8Jlw3Bmwbr92RBVNKl84_tabgtXIT0WMkMGjy0nXpqnzpr3oAiSk4PtESjjYV1JjmonSfsxWux_uDpnN-OSw8vuxsPHT-a2D1CvYMo9mYB9jp02WpvIl4TCLF9SFKLEEoGTisQEqoEKfESU4iXD8RxWP4KbkGJ76R2V19z18HGS4Dt41joaM144KTJ2PHnOI2VrJo0e5Vhd2VpsRk4B80HinyATew0BO0-qr8jIwVKmJ_jFCBuddQWaCdkHlPjvZRVJu61L3slDD36niSDi-7cglxMzQYlzHe0VT1npCDZlKdXYPPisH7rsGWq-wEmVxu5BCHoF4uEwAK2t9H1K86nvAU9zA7MtYcPv1uAViJj9YKQ-x7lUINjWCQ66vTXzNJS6PjXqcYbmc26VjIE30qP-fsJcuoBzUqutVnUyAVQW-vzJd8bX77-fXsiRe4cVq0czfqM5rupB0Tas-VGkFbOfQWEYjbrXJpgunV6kLFL-IAc7nTTQnQruo_JSkHcb11Luv0RaVI3ItZ4c4rp6jTfzD5mdnUTdDbPSIKO8Oj2BqY0Ui7HlTTIeNaTtmRg1auU3h3nExfZnbYYO6GlGdqi3P-p8wiyOtPOBtZyJNWfTZcjp5-Jd2kv8Vd6xtu0ZBEQL5pDGo83VgRulMkY10AlE60';
export const getCountries = () => {
    return new Promise(async (resolve, reject) => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        };

        fetch(`${BASE_URL}get-country-codes`, requestOptions)
            .then(result => result.json())
            .then(response => {
                if (response.status == 200) {
                    resolve(response);
                }
                if (response.errors) {
                    reject(response.errors)
                }
            })
            .catch(error => {
                console.log(error);
                reject(error.message)
            });
    });
};

export const getCMSPage = (pageId) => {
    return new Promise(async (resolve, reject) => {
        const token = await getAccessToken();
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        };
        fetch(`${BASE_URL}cms-page/${pageId}`, requestOptions)
            .then(result => result.json())
            .then(response => {
                if (response.status == 200) {
                    resolve(response);
                }
                if (response.errors) {
                    reject(response.errors)
                }
            })
            .catch(error => {
                console.log(error);
                reject(error.message)
            });
    });
};

export const getFAQ = () => {
    return new Promise(async (resolve, reject) => {
        const token = await getAccessToken();
        let formdata = new FormData([]);
        formdata.append("order_by", "ASC");
        formdata.append("limit", "10");
        formdata.append("page", "1");
        console.log("FORM_DATA_IN_FAQ:",formdata)
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            // body:formdata
        };
        fetch(`${BASE_URL}faq-with-search`, requestOptions)
            .then(result => result.json())
            .then(response => {
                if (response.status == 200) {
                    resolve(response);
                }
                if (response.errors) {
                    reject(response.errors)
                }
            })
            .catch(error => {
                console.log(error);
                reject(error.message)
            });
    });
};



export const stepStepInApi = (getFromFitbitData) => {
    return new Promise(async (resolve, reject) => {
        const token = await getAccessToken();
        var reqSteps = JSON.stringify({
            steps:getFromFitbitData.steps.value,
            burn_calorie:getFromFitbitData.calories.value,
            duration:[]
        })

        console.log(">>>>>>>>",reqSteps)
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body:reqSteps,
        };
        fetch(`${BASE_URL}add-user-steps}`, requestOptions)
            .then(result => result.json())
            .then(response => {
                console.log("RESPONSE_ADD_STEP>>",response)
                if (response.status == 200) {
                    resolve(response);
                }
                if (response.errors) {
                    reject(response.errors)
                }
            })
            .catch(error => {
                console.log(error);
                reject(error.message)
            });
    });
};

export const todayStepsInApi = () => {
    return new Promise(async (resolve, reject) => {
        const token = await getAccessToken();
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + tempToken
            },
        };
        fetch(`${BASE_URL}get-user-today-steps`, requestOptions)
            .then(result => result.json())
            .then(response => {
                if (response.status == 200) {
                    resolve(response);
                }
                if (response.errors) {
                    reject(response.errors)
                }
            })
            .catch(error => {
                console.log(error);
                reject(error.message)
            });
    });
};

export const weekStepsInApi = () => {
    return new Promise(async (resolve, reject) => {
        const token = await getAccessToken();
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + tempToken
            },
        };
        fetch(`${BASE_URL}get-user-weekly-steps`, requestOptions)
            .then(result => result.json())
            .then(response => {
                if (response.status == 200) {
                    resolve(response);
                }
                if (response.errors) {
                    reject(response.errors)
                }
            })
            .catch(error => {
                console.log(error);
                reject(error.message)
            });
    });
};
