import { BehaviorSubject } from "rxjs";
import Router from "next/router";
import User from "../types/user.types";


const userSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('bit-user') || '[]'))
const activeSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('active-bit-user') || '[]'))

const setActiveUser= async (id:string)=>{
    const prevUser=JSON.parse(localStorage.getItem('active-bit-user')||'[]');
    if(prevUser){
        revalidate(prevUser)
    }    
    activeSubject.next(id);
    localStorage.setItem('active-bit-user',JSON.stringify(id));
}
   

const login = async (body:User) => {
    const prev:User[] = JSON.parse(localStorage.getItem('bit-user') || '[]')
        prev.unshift(body)
        userSubject.next(prev)
        activeSubject.next(body.id);
        localStorage.setItem('active-bit-user',JSON.stringify(body.id));
        localStorage.setItem('bit-user', JSON.stringify(prev))
}

const revalidate = async (id?:string) => {
    let prev:User[] = JSON.parse(localStorage.getItem('bit-user') || '[]')
    const isLoggedIn=prev.find((user)=>{return user.id==id})
    prev=prev.filter((user)=>user.id!==id)
    if(isLoggedIn!==undefined){
        isLoggedIn.last_active= new Date().getTime()
        prev.unshift(isLoggedIn);
        userSubject.next(prev)
        localStorage.setItem('bit-user', JSON.stringify(prev))
    }
    else{
        null
    }
    
}



const logout = async (id?:string) => {
    let prev:User[] = JSON.parse(localStorage.getItem('bit-user') || '[]')
    prev=prev.filter((user)=>user.id!==id)
    userSubject.next(prev)
    localStorage.setItem('bit-user', JSON.stringify(prev))
    Router.reload()
}

export const userService = {
    user: userSubject.asObservable(),
    activeUser:activeSubject.asObservable(),
    get activeUserValue() {return activeSubject.value},
    get userValue() { return userSubject.value },
    login,
    logout,
    setActiveUser,
    revalidate,
}
