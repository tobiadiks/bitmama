import Head from "next/head"
import type { NextPage } from 'next'
import TextInput from "../../components/inputs/text.input"
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import PrimaryButton from "../../components/buttons/primary.button"
import { faLock } from "@fortawesome/free-solid-svg-icons"
import { useForm } from "react-hook-form"
import { userService } from "../../services/user.service"
import { useRouter } from "next/router"
import Fade from 'react-reveal/Fade';
import { toast, ToastContainer } from "react-toastify"
import Link from "next/link"
import User from "../../types/user.types"
const Login: NextPage = () => {
    const route = useRouter()
    const validateScheme = Yup.object().shape({
        username: Yup.string(),
    })
    const formOptions = { resolver: yupResolver(validateScheme) }
    const { register, handleSubmit, setError, formState } = useForm(formOptions)
    const { errors } = formState;
    const onsubmit = async (data:User) => {
        try {
            await userService.login(data)
            successNotify()
            route.push('/')
        } catch (error) {
            setError('error',{message:'error'});
            errorNotify()
        }
    }

   

    const errorNotify=()=>{toast.error("Something went wrong!")}
    const successNotify=()=>{toast("Success")}
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
                    onSubmit={handleSubmit((data) => { onsubmit(data) })}
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