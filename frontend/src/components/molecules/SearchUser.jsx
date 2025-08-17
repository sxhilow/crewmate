import React, {useState} from 'react'
import FormField from '../atoms/FormField'
import { Search } from '../../assets/icons'
import { searchUsers } from '../../controllers/user'
import SearchCard from './SearchCard'

const SearchUser = () => {
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    const [searchData, setSearchData] = useState([])
    
    const fetchUsers = async (item) => {
        setLoading(true)
        try {
            const res = await searchUsers(item)
            console.log(res);            
            setSearchData(res)
        } catch (error) {
            console.error(error.response.data.msg)
            setError(error.response.data.msg)        
        }finally{
            setLoading(false)
        }
    }
  return (
    <div className='pt-5'>
        <div className='px-4 relative'>
            <input type="text" className='w-full mb-4 mt-2 text-neutral-10 px-14 py-2 rounded-lg focus:ring-2 focus:ring-primary-blue focus:outline-none border' placeholder='search' onChange={(e) => fetchUsers(e.target.value)}/>

            <div className='text-slate-400 absolute left-8 top-7 transform -translate-y-1/2 cursor-pointer '>
                {<img src={Search} alt="Search"/>}
            </div>
        </div>
        <div>
            {
                loading ? (
                    <div className='text-desktop-h5 w-full h-screen flex justify-center items-center font-bold'>Loading...</div>
                ) : (
                    searchData.map((item, index) => (
                    <SearchCard key={index} id={item.id} name={item.name} username={item.username} bio={item.bio}/>
                ))
                )
            }
        </div>
    </div>
  )
}

export default SearchUser