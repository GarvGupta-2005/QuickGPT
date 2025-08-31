/* eslint-disable no-unused-vars */
import React, { use, useState } from 'react'
import { useAppContext } from '../Context/AppContext'
import { assets } from '../assets/assets'
import moment from 'moment'
import toast from 'react-hot-toast'

const Sidebar = ({isMenuOpen,setIsMenuOpen}) => {

    const { navigate,user,setUser,fetchUser,chats,setChats,selectedChat,setSelectedChat,theme,setTheme,credits,setCredits,createNewChat,loadingUser,setLoadingUser,token,setToken,fetchUsersChats,axios} = useAppContext()

    const [search, setSearch] = useState('')

    const logout = ()=>{
        localStorage.removeItem('token')
        setToken(null)
        toast.success("Logged Out Successfully")
    }
    
    const deleteChat = async (e, chatId) => {
    try {
        e.stopPropagation()
        const confirm = window.confirm("Do you want to delete this chat?!")
        if (!confirm) return

        const { data } = await axios.post(
            '/api/chat/delete',
            { chatId },
            { headers: { Authorization: token } }
        )

        if (data.success) {
            setChats(prev => prev.filter(chat => chat._id !== chatId))
            await fetchUsersChats()
            toast.success(data.message)
        }
    } catch (error) {
        toast.error(error.message)
    }
}



    return (
        <div className={`flex flex-col h-screen min-w-72 p-5 custom-dark:bg-gradient-to-b from-[#242124]/30 to-[#000000]/30 border-r border-[#80609F]/30 backdrop-blur-3xl transition-all duration-500 max-md:absolute left-0 z-1 ${!isMenuOpen && 'max-md:-translate-x-full'}`}>
            {/* {Logo} */}

            <img src={theme === 'dark' ? assets.logo_full : assets.logo_full_dark} className='w-full max-w-48' />

            {/* New Chat Button */}
            <button onClick={createNewChat} className='flex justify-center items-center w-full py-2 mt-10 text-white bg-gradient-to-r from-[#A456f7]  to-[#3D81F6] text-sm rounded-md cursor-pointer'>
                <span className='mr-2 text-2xl'>+</span>New Chat
            </button>

            {/* Search Converstaions */}

            <div className='flex items-center gap-2 p-3 mt-4 border border-gray-400 custom-dark:border-white/20 rounded-md'>

                <img src={assets.search_icon} className='w-4 not-custom-dark:invert' alt="" />
                <input onChange={(e) => setSearch(e.target.value)} value={search} type="text" placeholder='Search Converstaions' className='text-xs placeholder:text-gray-400 outline-none'></input>
            </div>


            {/* Recent Chats */}

            {chats.length > 0 && <p className='mt-4 text-sm'>Recent Chats</p>}
            <div className='flex-1 overflow-y-scroll mt-3 text-sm space-y-3'>
                {
                    chats
                        .filter((chat) =>
                            chat.messages[0]
                                ? chat.messages[0]?.content.toLowerCase().includes(search.toLowerCase())
                                : chat.name.toLowerCase().includes(search.toLowerCase())
                        )
                        .map((chat) => (
                            <div onClick={()=>{navigate('/');setSelectedChat(chat);setIsMenuOpen(false)}}
                                key={chat._id}
                                className="p-2 px-4 custom-dark:bg-[#57317C]/10 border border-gray-300 custom-dark:border-[#80609F]/15 rounded-md cursor-pointer flex justify-between group"
                            >
                                <div>
                                    <p className='truncate w-full'>
                                        {chat.messages.length>0? chat.messages[0].content.slice(0,32):chat.name}
                                    </p>
                                    <p className='text-xs text-gray-500 custom-dark:text-[#B1A6C0]'>
                                        {moment(chat.updatedAt).fromNow()}
                                    </p>
                                </div>
                                <img onClick={e=>toast.promise(deleteChat(e,chat._id),{loading : "...deleting"})} src={assets.bin_icon} className='hidden group-hover:block w-4 cursor-pointer not-custom-dark:invert' alt="" />
                            </div>
                        ))
                }
            </div>

            {/* Community  Images */}
            <div onClick={()=>{navigate('/community');setIsMenuOpen(false)}} className='flex items-center gap-2 p-3 mt-4 border border-gray-300 custom-dark:border-white/15 rounded-md cursor-pointer hover:scale-103 transition-all'>
                <img src={assets.gallery_icon} className='w-4.5 not-custom-dark:invert' alt="" />
                <div className='text-sm flex flex-col'>
                    <p>Community Images</p>
                </div>
            </div>

            {/* Credits  Images */}
            <div onClick={()=>{
                // navigate('/credits');
                setIsMenuOpen(false)}} 
                className='flex items-center gap-2 p-3 mt-4 border border-gray-300 custom-dark:border-white/15 rounded-md cursor-pointer hover:scale-103 transition-all'>
                <img src={assets.diamond_icon} className='w-4.5 custom-dark:invert' alt="" />
                <div className='text-sm flex flex-col'>
                    <p>Credits : {user?.credits || "Log in First"}</p>
                    {/* <p className='text-xs text-gray-400'>Purchase Credits to use QuickGPT</p> */}
                </div>
            </div>

            {/* Dark Mode toggle */}
            <div  className='flex items-center gap-2 justify-between p-3 mt-4 border border-gray-300 custom-dark:border-white/15 rounded-md'>
                <div className='text-sm flex gap-2 items-center'>
                    <img src={assets.theme_icon} className='w-4 not-custom-dark:invert' alt="" />
                    <p>Dark Mode</p>
                </div>

                <label className='relative inline-flex cursor-pointer'>
                    <input onChange={()=>setTheme(theme==='dark'?'light':'dark')} type="checkbox" className='sr-only peer' checked={theme==='dark'}/>

                    <div className='w-9 h-5 bg-gray-400 rounded-full peer-checked:bg-purple-500 transition-all'>
                    </div>

                    <span className='absolute left-1 top-1 w-3  h-3 bg-white rounded-full transition-transform peer-checked:translate-x-4'></span>
                </label>
            </div>

            {/* User Account */}

            <div  className='flex items-center gap-2 p-3 mt-4 border border-gray-300 custom-dark:border-white/15 rounded-md cursor-pointer group'>
                <img src={assets.user_icon} className='w-7 rounded-full' alt="" />
                <p className='flex-1 text-sm custom-dark:text-primary truncate'>{user?user.name : "Login"}</p>

                {user && <img onClick={logout} src={assets.logout_icon} className='h-5 cursor-pointer hidden not-custom-dark:invert group-hover:block'/>}
            </div>

            <img src={assets.close_icon} className='absolute w-5 h-5 top-3 right-3 cursor-pointer md:hidden not-custom-dark:invert' onClick={()=>setIsMenuOpen(false)} alt="" />
        </div>
    )
}

export default Sidebar