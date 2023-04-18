import { createContext, useContext, Context } from 'react'
import { useUser } from './useUser';

const authUserContext = createContext({ user: null, logout: null });

export function AuthUserProvider({ children }) {
  const { user, logout } = useUser()
  return (
    <authUserContext.Provider value={{ user, logout }}>
      {children}
    </authUserContext.Provider>
  )
}

export const useAuth = () => useContext(authUserContext);