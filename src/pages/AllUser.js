import React, { useEffect, useState } from 'react'
import SumaryApi from '../common'
import { toast } from 'react-toastify'
import moment from 'moment'
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from '../components/ChangeUserRole';


const AllUser = () => {
  const [allUsers, setAllUsers] = useState([])
  const [openUpdate, setOpenUpdate] = useState(false)
  const [updateUser, setUpdateUser] = useState({
    email: "",
    name: "",
    role:"",
    _id:"",
  })

  const fetchAllUsers = async () => {
    const fetchData = await fetch(SumaryApi.allUser.url, {
      method: SumaryApi.allUser.method,
      credentials: 'include',
    })

    const dataResponse = await fetchData.json()
    if (dataResponse.success) {
      setAllUsers(dataResponse.result)
    } else {
      toast.error(dataResponse.message)
    }
  }

  useEffect(() => {
    fetchAllUsers()
  }, [])

  return (
    <div className='pb-4 bg-white'>
      <table className='w-full userTable'>
        <thead>
          <tr className='bg-black text-white'>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user?.name}</td>
              <td>{user?.email}</td>
              <td>{user?.role}</td>
              <td>{moment(user?.createdAt).format('LL')}</td>
              <td>
                <button className='bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-300 hover:text-white' 
                onClick={()=>
                {
                  setOpenUpdate(true)
                  setUpdateUser(user)
                }
                }>
                <MdModeEdit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {
        openUpdate && (
          <ChangeUserRole 
            onClose={()=> setOpenUpdate(false)} 
            name={updateUser.name} 
            email={updateUser.email}
            role={updateUser.role}
            userId={updateUser._id}
            callFunc={fetchAllUsers()}
            />
        ) 
      }
    </div>
  )
}

export default AllUser
