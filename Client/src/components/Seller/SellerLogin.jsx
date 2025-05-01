import React, { useState ,useEffect} from 'react'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const SellerLogin = () => {
    const {isSeller, setIsSeller, navigate,axios} = useAppContext()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const onSubmitHandler = async (event) => {
        try {
            event.preventDefault()
            const {data} = await axios.post('/api/seller/login', {
                email,
                password
            })
            if(data.success) {
                setIsSeller(true)
                navigate('/seller')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
            
        }
    }
    useEffect(() => {
        if(isSeller) {
            navigate('/seller')
        }
    }, [isSeller])
  return !isSeller && (
    <form onSubmit={onSubmitHandler} className="flex flex-col gap-4 mt-35 justify-center m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white">
            <p className="text-2xl font-medium m-auto">
                <span className="text-purple-500">Seller</span> Login
            </p>

            <div className="w-full ">
                <p>Email</p>
                <input onChange={(e) => setEmail(e.target.value)} value={email}  placeholder="Email" className="border border-gray-200 rounded w-full p-2 mt-1 outline-purple-500" type="email" autoComplete='username'required />
            </div>
            <div className="w-full ">
                <p>Password</p>
                <input onChange={(e) => setPassword(e.target.value)} value={password}  placeholder="Password" className="border border-gray-200 rounded w-full p-2 mt-1 outline-purple-500" type="password" autoComplete='current-password'required />
            </div>
            <button className="bg-purple-500 hover:bg-purple-600 transition-all text-white w-full py-2 rounded-md cursor-pointer">
                Login
            </button>
        </form>
  )
}

export default SellerLogin
