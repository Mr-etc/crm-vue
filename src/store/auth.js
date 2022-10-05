import {getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth";
import { firebaseObject } from "@/store/firebaseObject"

export default{
    actions: {
        async login({dispatch, commit}, {email, password}){
            try {
                await signInWithEmailAndPassword(getAuth(firebaseObject), email, password);
            } catch (error) {
                console.log(error.code);
                throw error;
            }
        },
        async logout(){
            signOut(getAuth(firebaseObject));
        }
    }
}