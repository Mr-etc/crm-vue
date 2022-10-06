import {signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database"
import { firebaseObject, auth } from "@/store/firebaseObject"
import { register } from "register-service-worker";

export default{
    actions: {
        async login({dispatch, commit}, {email, password}){
            try {
                await signInWithEmailAndPassword(auth, email, password);
            } catch (error) {
                console.log(error.code);
                throw error;
            }
        },
        async logout(){
            signOut(auth);
        },
        async register({dispatch, commit}, {name, email, password}){
            try {
                await createUserWithEmailAndPassword(auth, email, password);
                const uid = await dispatch('getUid');
                const userRef = ref(`/users/${uid}/info`);
                await set(userRef, {
                    bill: 1000,
                    name
                });
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
        getUid(){
            const user = auth.currentUser;
            return user? user.uid : null;
        }
    }
}