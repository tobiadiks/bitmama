import type { NextPage } from 'next'
import Head from 'next/head'
import PrimaryButton from '../components/buttons/primary.button'
import Fade from 'react-reveal/Fade';
import { userService } from '../services/user.service';
import { useEffect, useState } from 'react';
import User from '../types/user.types';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    setUsers(userService.userValue)
  }, [users])

  const route = useRouter()

  return (
    <div className='font-archivo' >
      <Head>
        <title>Home</title>
        <meta name="description" content="Homepage" />
        <meta name="theme-color" content="rgb(34 197 94)"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-green-50 min-h-screen flex flex-col px-4 lg:px-0 md:px-8 py-8" >

        <Fade>
          <div className='w-full lg:w-1/3 mx-auto'>
            <div className='font-bold'>Current User:</div>
            <div className='my-4 w-full text-sm'>
            <div className='font-bold'>Active Sessions</div>
              {users.length ?
                users.map((i, index) =>
                  <div key={index} className='grid grid-cols-3 my-2'><div>{i.username}</div><div>active</div><div className='text-red-500 cursor-pointer' onClick={()=>userService.logout(i.username)}>logout</div></div>
                ) :
                <div className='text-center my-2 text-sm'>No logged in user</div>
              }
            </div>
            {users.length ?
            <>
            <div className='my-2'><PrimaryButton title='Logout' onclick={() => route.push('/auth/login')} /></div>
            </>
            :''}
            <div className='my-2'><PrimaryButton title='Sign in another account' onclick={() => route.push('/auth/login')} /></div>
            </div>
        </Fade>


      </main>


    </div>
  )
}

export default Home
