import { useEffect, useState } from "react";
import AdminContext from "./adminContext";

const AdminContextState = ({ children }) => {

    const [admin, setAdmin] = useState()
    const [adminAuthState, setAdminAuthState] = useState(false)


    const authenticateAdmin = async (email, password) => {
        if (email === '' && password === '' || !email || !password) return
        const res = await fetch('http://192.168.1.104:5000/api/admin/admin-login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const resData = await res.json()
        if (res.ok) {
            setAdminAuthState(true)
            setAdmin(resData.admin)
            // save token in local storage
            if(resData.token) localStorage.setItem('token', resData.token)
            else null
        return resData
        } else {
            setAdminAuthState(false)
            setAdmin(undefined)
        }
    }

    const checkForLocalStorage = async () => {
        const adminToken = localStorage.getItem('token')
        if (!adminToken) return
        const res = await fetch('http://192.168.1.104:5000/api/admin/admin-login', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${adminToken}`,
                'Content-Type': 'application/json'
            }
        })
        const resData = await res.json()
        console.log(resData)
        if (res.ok) {
            setAdminAuthState(true)
            setAdmin(resData.admin)

            if(resData.token) localStorage.setItem('token', resData.token) // set the new token to use
            else null
        } else {
            setAdminAuthState(false)
            setAdmin(undefined)
        }
    }

    useEffect(() => { checkForLocalStorage() }, [])

    return (
        <AdminContext.Provider value={{ admin, adminAuthState, authenticateAdmin }}>
            {children}
        </AdminContext.Provider>
    )
}

export default AdminContextState