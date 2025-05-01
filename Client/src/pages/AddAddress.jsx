import React, { useEffect, useState } from 'react'
import { assets } from '../assets/asserts'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
const InputField=({type, placeholder, name, handleChange, address})=>(
        <input className='w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-purple-500 transition'
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={handleChange}
        value={address[name]}
        required
        />
    )

const AddAddress = () => {

    const {axios, user, navigate} = useAppContext();

    const [address, setAddress] = useState({
        firstname: '',
        lastname: '',
        email: '',
        street: '',
        city: '',
        state: '',
        pincode: '', // ✅ must match the schema
        country: '',
        phone: '',
      });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddress((prevAddress) => ({
        ...prevAddress,
        [name]:value
        }));}

        const onSubmitHandler = async (e) => {
            e.preventDefault();
            try {
              const { data } = await axios.post('/api/address/add', {
                address,
                userId: user._id, // ✅ include userId
              });
              if (data.success) {
                toast.success(data.message);
                navigate('/orders');
              } else {
                toast.error(data.message);
              }
            } catch (error) {
              toast.error(error.message);
            }
          };

    useEffect(() => {
        if(!user){
            navigate('/orders')
        }
    }
    , [user])

  return (
    <div className='mt-35 pb-35'>
        <p className='text-2xl md:text-3xl text-gray-500'>Add Shipping <span className='font-semibold text-purple-500'>Address</span></p>
        <div className='flex flex-col-reverse md:flex-row justify-between mt-10'>
            <div className='flex-1 max-w-md'>
                    <form onSubmit={onSubmitHandler} className='space-y-3 mt-6 text-sm'>
                        <div className='grid grid-cols-2 gap-4'>
                    <InputField handleChange={handleChange} address={address} name="firstname" type="text" placeholder="First Name"/>
                    <InputField handleChange={handleChange} address={address} name="lastname" type="text" placeholder="Last Name"/>
                    </div>
                    <InputField handleChange={handleChange} address={address} name="email" type="email" placeholder="Email Address"/>
                    <InputField handleChange={handleChange} address={address} name="street" type="text" placeholder="Street Address"/>
                    <div className='grid grid-cols-2 gap-4'>
                    <InputField handleChange={handleChange} address={address} name="city" type="text" placeholder="City"/>
                    <InputField handleChange={handleChange} address={address} name="state" type="text" placeholder="State"/>
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                    <InputField handleChange={handleChange} address={address} name="pincode" type="text" placeholder="Pin Code"/>
                    <InputField handleChange={handleChange} address={address} name="country" type="text" placeholder="Country"/>
                    </div>
                    <InputField handleChange={handleChange} address={address} name="phone" type="text" placeholder="Phone Number"/>
                    <button type='submit' className='w-full bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition'>Add Address</button>
                    </form>
            </div>
            <img className='md:mr-16 mb-16 md:mt-0' src={assets.add_address_iamge} alt='add-address'/>
        </div>

      
    </div>
  )
}

export default AddAddress
