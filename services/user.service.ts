import { BehaviorSubject } from "rxjs";
import Router from "next/router";
import User from "../types/user.types";


const userSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('bit-user') || '[]'))

const login = async (body:User) => {
    const prev = JSON.parse(localStorage.getItem('bit-user') || '[]')
    if(prev.length){
        userSubject.next(prev)
    }
    
    console.log(prev)
    localStorage.setItem('bit-user', JSON.stringify([body,prev]))
}



const logout = async () => {
    localStorage.removeItem('user');
    userSubject.next(null)
    Router.push('/auth/login')
}

export const userService = {
    user: userSubject.asObservable(),
    get userValue() { return userSubject.value },
    login,
    logout
}