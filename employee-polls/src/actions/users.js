import {ACTIONS} from "../utils/constants"

export function setAuthedUser(id) {
    return {
        type: ACTIONS.SET_AUTHED_USER,
        id
    }
}

export function receiveUsers(users) {
    return {
        type: ACTIONS.RECEIVE_USERS,
        users
    };
}