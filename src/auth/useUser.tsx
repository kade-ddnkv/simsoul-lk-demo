import { useEffect, useState } from 'react';
import router from 'next/router';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import initFirebase from '../config';
import {
  removeUserCookie,
  setUserCookie,
  getUserFromCookie
} from './userCookie';

initFirebase();

export const mapUserData = async user => {
  const { uid, email } = user;
  const token = await user.getIdToken(true);
  return {
    id: uid,
    email,
    token
  };
};

interface User {
  id: any,
  email: string,
  token: any
}
  
const useUser = () => {
  const [user, setUser] = useState<User>()

  const logout = async () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        router.push('/signin');
      })
      .catch(e => {
        console.error(e);
      });
  };

  useEffect(() => {
    console.log('effect used')
    const cancelAuthListener = firebase
      .auth()
      .onAuthStateChanged(async userToken => {
        console.log('auth state changed')
        console.log(userToken)
        if (userToken) {
          const userData = await mapUserData(userToken);
          setUserCookie(userData);
          setUser(userData);
          console.log(router.asPath)
          if (router.asPath === '/signin' || router.asPath === '/signup') {
            router.push('/')
          }
        } else {
          removeUserCookie();
          setUser(undefined);
        }
      });

    const userFromCookie = getUserFromCookie()
    if (userFromCookie) {
      setUser(userFromCookie)
    }
    return () => { console.log('effect cancelled'); cancelAuthListener() };
  }, []);

  return { user, logout };
};

export { useUser };