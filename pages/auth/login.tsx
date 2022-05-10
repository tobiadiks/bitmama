import Head from "next/head"
import type { NextPage } from 'next'
import TextInput from "../../components/inputs/text.input"
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import PrimaryButton from "../../components/buttons/primary.button"
import { useForm } from "react-hook-form"
import { userService } from "../../services/user.service"
import { useRouter } from "next/router"
import Fade from 'react-reveal/Fade';
import { toast, ToastContainer } from "react-toastify"
import Link from "next/link"
import User from "../../types/user.types"
import { useState, useEffect } from "react"
const Login: NextPage = () => {
    const route = useRouter()
    const validateScheme = Yup.object().shape({
        username: Yup.string(),
    })
    const formOptions = { resolver: yupResolver(validateScheme) }
    const { register, handleSubmit, formState } = useForm(formOptions)
    const [users, setUsers] = useState<User[]>([]);
    const [activeUser, setActiveUser] = useState<string>('');
    useEffect(() => {
      setUsers(userService.userValue)
      setActiveUser(userService.activeUserValue);
    }, [users,activeUser])

    const onsubmit = async (username:string) => {
        const isLoggedIn=users.find((user)=>{return user.username.toLowerCase()==username.toLowerCase()})
            if (isLoggedIn?.username.toLowerCase()==username.toLowerCase()) {
                errorNotify('User is already logged.')
                userService.setActiveUser(isLoggedIn.id)
                userService.revalidate(isLoggedIn.id)
                setTimeout(() => route.push('/'), 2000)
            }
            else {
                await userService.login({username,last_active:new Date().getTime(),id: '_'+Math.random().toString(36).substring(2,5)})
                successNotify()
                setTimeout(() => route.push('/'), 2000)
            }

    }



    const errorNotify = (error?: string) => { toast.error(error ? error : "Something went wrong!") }
    const successNotify = () => { toast("Success") }
    return (
        <div className='font-archivo' >
            <ToastContainer
            />
            <Head>
                <title>Log in</title>
                <meta name="description" content="Login" />
                <meta name="theme-color" content="rgb(34 197 94)"></meta>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="bg-green-50 min-h-screen flex px-4 lg:px-0 md:px-8 py-8" >
                <Fade clear ssrFadeout>
                    <form
                        onSubmit={handleSubmit((data) => { onsubmit(data.username); })}
                        className="mx-auto my-auto px-4 py-8 bg-white rounded-sm w-full  lg:w-1/3">
                        <Link passHref href={'/'}><div className='font-bold text-xl text-center my-auto  cursor-pointer'>Bitmama</div></Link>
                        <div className='font-thin text-base text-center my-auto '>Let&apos;s log you in.</div>
                        <div>
                            <TextInput
                                name="username"
                                label="Username"
                                type="username"
                                required
                                register={register}
                            />
                            <div className="relative pb-8"><PrimaryButton type={'submit'} title={`${formState.isSubmitting ? 'Loading' : 'Log in'}`} /></div>
                        </div>
                    </form>
                </Fade>
            </main>
        </div>
    )
}
export default Login
