import { writeStorage, readStorage, removeAllStorage, removeStorage } from './asyncStorage'
// Access Token
export const setAccessToken = async value => {
    return (promise = new Promise(function (resolve) {
        resolve(writeStorage('ACCESS_TOKEN', value))
    }))
}

export const getAccessToken = async () => {
    return (promise = new Promise(function (resolve) {
        resolve(readStorage('ACCESS_TOKEN'))
    }))
}

export const removeAccessToken = async () => {
    return (promise = new Promise(function (resolve) {
        resolve(removeStorage('ACCESS_TOKEN'))
    }))
}
// User
export const setUserLocal = async value => {
    return (promise = new Promise(function (resolve) {
        resolve(writeStorage('USER', value))
    }))
}

export const getUserLocal = async () => {
    return (promise = new Promise(function (resolve) {
        resolve(readStorage('USER'))
    }))
}

export const removeUserLocal = async () => {
    return (promise = new Promise(function (resolve) {
        resolve(removeStorage('USER'))
    }))
}
// FCM Token
// Access Token
export const setFCMToken = async value => {
    return (promise = new Promise(function (resolve) {
        resolve(writeStorage('FCM_TOKEN', value))
    }))
}

export const getFCMToken = async () => {
    return (promise = new Promise(function (resolve) {
        resolve(readStorage('FCM_TOKEN'))
    }))
}

export const removeFCMToken = async () => {
    return (promise = new Promise(function (resolve) {
        resolve(removeStorage('FCM_TOKEN'))
    }))
}

// Fitbit Token

export const getFitbitToken = async () => {
    return (promise = new Promise(function (resolve) {
        resolve(readStorage('FIT_BIT_TOKEN'))
    }))
}

export const removeFitbitToken = async () => {
    return (promise = new Promise(function (resolve) {
        resolve(removeStorage('FIT_BIT_TOKEN'))
    }))
}

export const setFitbitToken = async value => {
    return (promise = new Promise(function (resolve) {
        resolve(writeStorage('FIT_BIT_TOKEN', value))
    }))
}


//Paired Decision

export const setPairedDecision = async value => {
    return (promise = new Promise(function (resolve) {
        resolve(writeStorage('PAIRED_DECISION', value))
    }))
}

export const getPairedDecision = async () => {
    return (promise = new Promise(function (resolve) {
        resolve(readStorage('PAIRED_DECISION'))
    }))
}

export const removePairedDecision = async () => {
    return (promise = new Promise(function (resolve) {
        resolve(removeStorage('PAIRED_DECISION'))
    }))
}
