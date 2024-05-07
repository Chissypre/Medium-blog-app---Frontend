import {Outlet, Navigate, NavLink} from 'react-router-dom'
import { useContext, useState, useRef, useEffect } from 'react'
import { FaBell } from "react-icons/fa";
import { IoDocument } from "react-icons/io5";
import { TfiWrite } from "react-icons/tfi";
import { FaUserCircle } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaBarsStaggered } from "react-icons/fa6";
import { UserContext } from '../App'


const SideNav = () => {
  let page = location.pathname.split("/");
  let [pageState, setPageState] = useState(page[0].replace('-', ' '));
  let [showSideNav, setShowSideNav] = useState(false);
  let activeTabLine = useRef();
  let sideBarIconTab = useRef();
  let PageStateTab = useRef();

  const changePageState = (e) => {
    let { offsetWidth, offsetLeft } = e.target;

    activeTabLine.current.style.width = offsetWidth + "px";
    activeTabLine.current.style.left = offsetLeft + "px";

    if (e.target === sideBarIconTab.current) {
      setShowSideNav(true);
    } else {
      setShowSideNav(false);
    }
  };

  let { userAuth } = useContext(UserContext) || {};
  let { access_token,  new_notification_available, isAdmin } = userAuth || {};

  useEffect(()=>{
setShowSideNav(false)
PageStateTab.current.click()
  },[pageState])

  return (
    access_token === null ? <Navigate to="/signin" /> :
      <>
        <section className='relative flex gap-10 py-0 m-0 max-md:flex-col mt-10'>
          <div className="sticky top-[80px] z-30">
            <div className='md:hidden bg-white py-1 border-b border-grey flex flex-nowrap overflow-x-auto'>
              <button className='p-5 capitalize'>
                <div ref={sideBarIconTab} onClick={changePageState}>
                  <FaBarsStaggered className='pointer-events-none' />
                </div>
              </button>
              
              <button ref={PageStateTab} className='p-5 capitalize' onClick={changePageState}>
                {pageState}
              </button>
            
              <hr ref={activeTabLine} className='absolute bottom-0 duration-500' />
            </div>


<div className={`min-w-[200px] h-[100vh-80px-60px] md:h-cover md:sticky top-24 overflow-y-auto p-6 md:pr-0
 md:border-grey md:border-r absolute max-md:top-[64px] bg-white max-md:w-[calc(100%+80px)] max-md:px-16 max-md:-ml-7
  duration-500 ${!showSideNav ? 'max-md:opacity-0 max-md:pointer-events-none' : 'opacity-100 pointer-events-auto'}`}>
<h1 className="text-xl text-dark-grey">Dashboard</h1>
<hr className='border-grey -ml-6 mb-8 mr-6'/>
<NavLink to="/dashboard/blogs" onClick={(e)=>setPageState(e.target.innerText)} className="sidebar-link">Blogs
<IoDocument className='h-6 w-6'/>
</NavLink>
<NavLink to="/dashboard/notifications" onClick={(e)=>setPageState(e.target.innerText)} className="sidebar-link">Notification
{
  new_notification_available ? <span className="bg-red w-3 h-3 rounded-full z-10 left-10 bottom-2 relative"></span> : ""
 }
<FaBell className='h-6 w-6' />
 
</NavLink>
{ isAdmin ?
<NavLink to="/editor" onClick={(e)=>setPageState(e.target.innerText)} className="sidebar-link">Write
<TfiWrite className='h-6 w-6'/>
</NavLink> : ""
}
<h1 className="text-xl text-dark-grey mt-20">Settings</h1>
<hr className='border-grey -ml-6 mb-8 mr-6'/>
<NavLink to="/settings/edit-profile" onClick={(e)=>setPageState(e.target.innerText)} className="sidebar-link">Edit Profile
<FaUserCircle className='h-6 w-6' />
</NavLink>
<NavLink to="/settings/change-password" onClick={(e)=>setPageState(e.target.innerText)} className="sidebar-link">Change Password
<FaLock className='h-6 w-6'/>
</NavLink>
</div>

</div>

<Outlet/>

    </section>
    <div className='max-md:-mt-8 mt-5 w-full'>
    
    </div>
    </>
    
  )
}

export default SideNav