// React Context allows you to share data between components without passing props manually through every parent component.
// Real-life example: Imagine a family WhatsApp group. Instead of telling every family member separately, you send one message to the group, and everyone can access it.
// Similarly, Context makes shared data available to components inside its provider.

import { useState , createContext } from "react";

// It creates a Context object that we can use to share data between components.
export const AuthContext = createContext()

// It is a component that will provide authentication-related data to its child components.
// children means whatever components you put inside AuthProvider.
export const AuthProvider = ({children}) => {
  const [user , setUser] = useState(null)

  const login = (userData) => {
    setUser(userData)
    //Imagine the user refreshes the website. React state starts again, so without persistence the user information would be lost.
    //LocalStorage keeps data in the browser even after refreshing or closing the browser.

    // LocalStorage stores values as strings. JSON.stringify() converts a JavaScript object into a string.
    localStorage.setItem("userInfo" , JSON.stringify(userData))
  }

  // Logout hone par user ka data React state aur browser localStorage dono se remove ho jata hai.
  const logout = () => {
    setUser(null)
    localStorage.removeItem("userInfo")
  }

  return(
    <AuthContext.Provider value={{user , login , logout}}>
      {children}
    </AuthContext.Provider>
  )

}

export default AuthProvider
