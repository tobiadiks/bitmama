import { BehaviorSubject } from "rxjs";
import Router from "next/router";
import User from "../types/user.types";


const userSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('bit-user') || '[]'))

const login = async (body:User) => {
    const prev:User[] = JSON.parse(localStorage.getItem('bit-user') || '[]')
        prev.push(body)
        userSubject.next(prev)
        localStorage.setItem('bit-user', JSON.stringify(prev))
}



const logout = async (id?:string) => {
    let prev:User[] = JSON.parse(localStorage.getItem('bit-user') || '[]')
    prev=prev.filter((user)=>user.id!==id)
    userSubject.next(prev)
    localStorage.setItem('bit-user', JSON.stringify(prev))
    Router.push('/auth/login')
}

export const userService = {
    user: userSubject.asObservable(),
    get userValue() { return userSubject.value },
    login,
    logout
}