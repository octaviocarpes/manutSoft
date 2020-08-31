import { AsyncStorage } from "react-native";

export class AuthService {
    static setUID(uid) {
        return AsyncStorage.setItem('@UID', uid);
    }

    static getUID() {
        return AsyncStorage.getItem('@UID');
    }
}

// export { AuthService }