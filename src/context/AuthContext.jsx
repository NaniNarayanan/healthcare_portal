import { createContext, useContext,useState } from "react";

const defaultUsers = [
    {
        email: 'atulassan007@gmail.com',
        password: 'atha123',
        role: 'user'
    },
    {
        email: 'atulassan777@gmail.com',
        password: 'atha123',
        role: 'admin'
    },
    {
        email: 'atulassan123@gmail.com',
        password: 'atha123',
        role: 'admin'
    }
]

export const AuthContext = createContext();

export default function AuthProvider({children}) {
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState(defaultUsers)

    const login = (data) => {
        const findUsers = users.find((user)=> user.email === data.email && user.password === data.password);
        console.log(findUsers);
        setUser(findUsers[0]);
        return findUsers ? true : false;       
    }

    const register = (data) => {
        return data;       
    }

    const logout = ()=> {
        setUser({})
    }
    
    return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );

}