import * as RNLocalize from "react-native-localize";
import { getAccessToken } from "../storage";
import { BASE_URL } from '../utils';

export const syncStepSource = (accessToken) => {
  return new Promise(async (resolve, reject) => {
    try {
      const steps_result = await fetchAllApi(
        'https://api.fitbit.com/1/user/-/activities/steps/date/today/1d.json',
        'GET',
        accessToken,
      );
      const calories_result = await fetchAllApi(
        'https://api.fitbit.com/1/user/-/activities/calories/date/today/1d.json',
        'GET',
        accessToken,
      );
      const distance_result = await fetchAllApi(
        'https://api.fitbit.com/1/user/-/activities/distance/date/today/1d.json',
        'GET',
        accessToken,
      );

      const arrObj = {};
      if (steps_result['activities-steps']) {
        arrObj.steps = steps_result['activities-steps'][0];
      } else {
        console.log("ERROR_ON_STEPS")
      }
      if (calories_result['activities-calories']) {
        arrObj.calories = calories_result['activities-calories'][0];
      } else {
        console.log("ERROR_ON_CALORIES")
      }
      if (distance_result['activities-distance']) {
        arrObj.distance = distance_result['activities-distance'][0];
      } else {
        console.log("ERROR_ON_DISTANCE")
      }
      resolve(arrObj)

    }
    catch (error) {
      // TODO: Handle authorization token failed issue
      console.log('syncStepSource Catch Error', error);
      reject(error);
    }
  });
};

const fetchAllApi = async (
  endPoint,
  method,
  token,
) => {
  try {
    return new Promise(async (resolve, reject) => {
      const requestOptions = {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Timezone': await getTimeZone()
        }
      };
      await fetch(endPoint, requestOptions)
        .then(result => result.json())
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          console.log('fetchAllApi Error', error);
          reject(error.message)
        });
    });
  }
  catch (error) {
    console.log('fetchAllApi Catch Error', error);
    return error;
  }
}

const getTimeZone = async () => {
  return RNLocalize.getTimeZone();
}

export const syncStepDestination = (postData) => {
  // let newData = {"burn_calorie": "1240", "response_type": "watch", "steps": "123"}
  console.log("postData>>>>>>>", postData)
  return new Promise(async (resolve, reject) => {
    const uat = await getAccessToken();
    const postDataStr = JSON.stringify(postData);
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + uat,
      },
      body: postDataStr,
    };
    // console.log(requestOptions)
    fetch(`${BASE_URL}add-user-steps`, requestOptions)
      .then(result => result.json())
      .then(response => {
        // console.log('response>>>>>>>>>>', response)
        // return;
        if (response.status == 200) {
          resolve(response);
        }
        if (response.errors) {
          reject(response.errors)
        }
      })
      .catch(error => {
        console.log('syncStepDestination error', error);
        reject(error.message)
      });
  });
}


export const getUserTotalSteps = () => {
  return new Promise(async (resolve, reject) => {
    const token = await getAccessToken();
    // let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMzE3MTQyMWM5Y2Q0NjBhNjM5NThhN2NmZjdmMTE5N2IyNmMzOGI1N2JmNmVhZTAzZWE4NTljNmEzMDgxMDIyNmFmMDNhZmZmMjE2ZTZkODkiLCJpYXQiOjE2NjA0NTg5ODQuMzg3MjUzLCJuYmYiOjE2NjA0NTg5ODQuMzg3MjU3LCJleHAiOjE2OTE5OTQ5ODQuMzg1NTc3LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.MQd4OE1PZBTu_3FU0S8Jlw3Bmwbr92RBVNKl84_tabgtXIT0WMkMGjy0nXpqnzpr3oAiSk4PtESjjYV1JjmonSfsxWux_uDpnN-OSw8vuxsPHT-a2D1CvYMo9mYB9jp02WpvIl4TCLF9SFKLEEoGTisQEqoEKfESU4iXD8RxWP4KbkGJ76R2V19z18HGS4Dt41joaM144KTJ2PHnOI2VrJo0e5Vhd2VpsRk4B80HinyATew0BO0-qr8jIwVKmJ_jFCBuddQWaCdkHlPjvZRVJu61L3slDD36niSDi-7cglxMzQYlzHe0VT1npCDZlKdXYPPisH7rsGWq-wEmVxu5BCHoF4uEwAK2t9H1K86nvAU9zA7MtYcPv1uAViJj9YKQ-x7lUINjWCQ66vTXzNJS6PjXqcYbmc26VjIE30qP-fsJcuoBzUqutVnUyAVQW-vzJd8bX77-fXsiRe4cVq0czfqM5rupB0Tas-VGkFbOfQWEYjbrXJpgunV6kLFL-IAc7nTTQnQruo_JSkHcb11Luv0RaVI3ItZ4c4rp6jTfzD5mdnUTdDbPSIKO8Oj2BqY0Ui7HlTTIeNaTtmRg1auU3h3nExfZnbYYO6GlGdqi3P-p8wiyOtPOBtZyJNWfTZcjp5-Jd2kv8Vd6xtu0ZBEQL5pDGo83VgRulMkY10AlE60';
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    };
    fetch(`${BASE_URL}get-user-total-steps-history-by-custom`, requestOptions)
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
        console.log('getUserTotalSteps catch', error);
        reject(error.message)
      });
  });
}

export const getUserActiveTotalSteps = (type) => {
  return new Promise(async (resolve, reject) => {
    const token = await getAccessToken();
    // let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMzE3MTQyMWM5Y2Q0NjBhNjM5NThhN2NmZjdmMTE5N2IyNmMzOGI1N2JmNmVhZTAzZWE4NTljNmEzMDgxMDIyNmFmMDNhZmZmMjE2ZTZkODkiLCJpYXQiOjE2NjA0NTg5ODQuMzg3MjUzLCJuYmYiOjE2NjA0NTg5ODQuMzg3MjU3LCJleHAiOjE2OTE5OTQ5ODQuMzg1NTc3LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.MQd4OE1PZBTu_3FU0S8Jlw3Bmwbr92RBVNKl84_tabgtXIT0WMkMGjy0nXpqnzpr3oAiSk4PtESjjYV1JjmonSfsxWux_uDpnN-OSw8vuxsPHT-a2D1CvYMo9mYB9jp02WpvIl4TCLF9SFKLEEoGTisQEqoEKfESU4iXD8RxWP4KbkGJ76R2V19z18HGS4Dt41joaM144KTJ2PHnOI2VrJo0e5Vhd2VpsRk4B80HinyATew0BO0-qr8jIwVKmJ_jFCBuddQWaCdkHlPjvZRVJu61L3slDD36niSDi-7cglxMzQYlzHe0VT1npCDZlKdXYPPisH7rsGWq-wEmVxu5BCHoF4uEwAK2t9H1K86nvAU9zA7MtYcPv1uAViJj9YKQ-x7lUINjWCQ66vTXzNJS6PjXqcYbmc26VjIE30qP-fsJcuoBzUqutVnUyAVQW-vzJd8bX77-fXsiRe4cVq0czfqM5rupB0Tas-VGkFbOfQWEYjbrXJpgunV6kLFL-IAc7nTTQnQruo_JSkHcb11Luv0RaVI3ItZ4c4rp6jTfzD5mdnUTdDbPSIKO8Oj2BqY0Ui7HlTTIeNaTtmRg1auU3h3nExfZnbYYO6GlGdqi3P-p8wiyOtPOBtZyJNWfTZcjp5-Jd2kv8Vd6xtu0ZBEQL5pDGo83VgRulMkY10AlE60';
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    };
    fetch(`${BASE_URL}get-user-total-active-steps-history?response_type=${type}`, requestOptions)
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
        console.log('getUserActiveTotalSteps Catch', error);
        reject(error.message)
      });
  });
}



export const getUserSteps = (postData) => {
  // console.log("XXXXXXXXXXXXXXX",postData)
  return new Promise(async (resolve, reject) => {
    const token = await getAccessToken();
    console.log("TOKEN:",token)
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    };
    fetch(`${BASE_URL}get-user-${postData.type}-steps?response_type=${postData.response_type}`, requestOptions)
      .then(result => result.json())
      .then(response => {
        // console.log(">>>>>>>>>>>>",response)
        if (response.status == 200) {
          resolve(response);
        }
        if (response.errors) {
          reject(response.errors)
        }
      })
      .catch(error => {
        console.log('getUserSteps Catch', error);
        reject(error.message)
      });
  });
}
