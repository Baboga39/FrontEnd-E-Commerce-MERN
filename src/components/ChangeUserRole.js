import React, { useState } from 'react'
import Role from '../common/role'
import { MdClose } from "react-icons/md";
import SumaryApi from '../common';
import { toast } from 'react-toastify';


const ChangeUserRole = ({
    name,
    email,
    role,
    userId,
    onClose,
    callFunc,
}) => {

    const [userRole, setUserRole] = useState(role)

    const handleOnChangeSelect = (event) => {
        setUserRole(event.target.value)
    }

    const updateUserRole = async() => {
        const fetchResponse = await fetch(SumaryApi.updateUser.url,{
            method: SumaryApi.updateUser.method,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                role: userRole,
                userId: userId,
                name: name,
                email: email,
            }),
        })

        const responseData = await fetchResponse.json()
        if(responseData.success){
            onClose()
            toast.success(responseData.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            })
        }
        else{
            toast.error(responseData.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            })
            onClose()
            callFunc()
        }
    }

return (
    <div className='fixed top-0 bottom-0 right-0 left-0 w-full h-full z-10 flex justify-between items-center bg-slate-200 bg-opacity-50 '>
    <div className='w-full mx-auto bg-white shadow-md p-4 max-w-sm'>
        <button className='block ml-auto' onClick={(onClose)}>
            <MdClose />
        </button>
        <h1 className='pb-4 text-lg font-medium'>Change User Role</h1>
            <p>Name: {name}</p>
            <p>Email: {email}</p>
        
        <div className='flex items-center justify-between my-4'>
        <p>Role: </p>
            <select className='border px-4 py-1' value={userRole} onChange={handleOnChangeSelect}>
                {
                    Object.values(Role).map(role =>{
                        return <option value={role} key={role}>{role}</option> 
                    })
                }
            </select>
        </div>
        <button className='w-fit mx-auto block py-1 px-3 rounded-full bg-red-500 text-white hover:bg-red-600' onClick={updateUserRole}>Change role</button> 
        </div>
    </div>
  )
}

export default ChangeUserRole
