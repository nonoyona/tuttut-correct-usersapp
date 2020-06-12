import * as fb from "firebase";
import { Correction } from "../store/Correction";
import { getModule } from "vuex-module-decorators";
import { CorrectionsModule } from "../store/index";

const firebase = fb.initializeApp({
    apiKey: "AIzaSyAhIlYHQAr_-j-voNdE_btsxA6r36MtsXg",
    authDomain: "correct-uni.firebaseapp.com",
    databaseURL: "https://correct-uni.firebaseio.com",
    projectId: "correct-uni",
    storageBucket: "correct-uni.appspot.com",
    messagingSenderId: "164293409933",
    appId: "1:164293409933:web:c3f42f987d49c62c9e76c4",
});


let currentUser: fb.User | null = null;

export async function loadCorrections() {
    const callable = firebase.functions().httpsCallable("loadCorrections");
    const result = await callable.call({});
    console.log("got result");
    console.log(result.data.result);
    if (result.data.status == 200) {
        return result.data.result as Correction[];
    } else {
        return null;
    }
}

firebase.auth().onAuthStateChanged(async (user) => {
    currentUser = user;
    const corr = await loadCorrections();
    if (corr != null) getModule(CorrectionsModule).loaded(corr);
});

export async function signIn(code: string) {
    try {
        await firebase.auth().setPersistence("local");
        const user = await firebase
            .auth()
            .signInWithEmailAndPassword(`${code}@tuttut.ecoxhy.de`, code);
        currentUser = user.user;
        return user.user;
    } catch (error) {
        return null;
    }
}

export async function signOut() {
    await firebase.auth().signOut();
}

export function getUser() {
    return new Promise<fb.User | null>((resolve, reject) => {
        firebase.auth().onAuthStateChanged(async (user) => {
            resolve(user);
        });
    });
}

export function getCurrentUser() {
    return currentUser;
}
