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
  const [activeUser, setActiveUser] = useState<string>('');
  useEffect(() => {
    setUsers(userService.userValue)
    setActiveUser(userService.activeUserValue);
  }, [users,activeUser])

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
            <div className='font-bold'>Current User:&nbsp;{(users.find((user)=>{return user.id==activeUser}))?.username || 'No logged in session'}</div>
            <div className='my-4 w-full text-sm'>
            <div className='font-bold'>Active Sessions/Tabs</div>
              {users.length ?
                users.map((i) =>
               
                  <div onClick={()=>{userService.setActiveUser(i.id);userService.revalidate(i.id); route.reload()}} key={i.id} className={`${i.id==activeUser?'bg-green-300':'bg-green-100'} hover:bg-green-200 cursor-pointer rounded-sm p-4 grid grid-cols-3 my-2`}><div>{i.username}</div><div>{(new Date().getTime() - i.last_active)/1000>60?'idle':'active'}</div><div className='text-red-500 cursor-pointer' onClick={()=>{activeUser==i.id? userService.logout(activeUser):userService.logout(i.id);activeUser==i.id?userService.setActiveUser(''):''}}>logout</div></div>
                  
              ) :
                <div className='text-center my-2 text-sm'>No logged in user</div>
              }
            </div>
            {activeUser.length && users.length ?
            <>
            <div className='my-2'><PrimaryButton title='Logout' onclick={() => {userService.logout(activeUser);userService.setActiveUser('')}} /></div>
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
