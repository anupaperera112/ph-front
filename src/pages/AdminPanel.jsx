import { SideBar } from "../components"
import { useState } from 'react'
import { HomePage, Reports, ManageAccount, Profile } from '../pages'
const AdminPanel = () => {
  const [activeMenuItem, setActiveMenuItem] = useState('Home');
  return (
    <div className="flex"> 
      <div>
          <SideBar  activeMenuItem={activeMenuItem} setActiveMenuItem={setActiveMenuItem}  adminName={'Jayasuriya pharmacy'}/>
      </div>
      {activeMenuItem === 'Home' && (
            <div className='px-[320px]'>
              <HomePage/>
            </div>
          )}
        {activeMenuItem === 'Inventory' && (
            <div className='px-[320px]'>
              <Profile/>
            </div>
          )}
        {activeMenuItem === 'Generate Reports' && (
            <div className='px-[320px]'>
              <Reports/>
            </div>
          )}
        {activeMenuItem === 'Manage Account' && (
            <div className='px-[320px]'>
              <ManageAccount/>
            </div>
          )}

      </div>
  )
}

export default AdminPanel
