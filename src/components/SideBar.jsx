import { StatsIcon, AuthorizeIcon, ManageIcon, HomeIcon } from '../assets/icons/icon';

const SideBar = ({ activeMenuItem, setActiveMenuItem, adminName }) => {
  const menuItems = [
    { name: 'Home', icon: <HomeIcon /> },
    { name: 'Inventory', icon: <AuthorizeIcon /> },
    { name: 'Generate Reports', icon: <StatsIcon />  },
    { name: 'Manage Account', icon: <ManageIcon /> },
  ];

  return (
    <div className='bg-slate-600 fixed left-0 bottom-0 top-0 w-[300px] text-white'>
        <div className='text-2xl p-8'>
            
            {adminName}
        </div>
        <ul>
            {menuItems.map((item, index) => (
                <li key={index} className={`flex ml-8 text-xl gap-2 mb-2 cursor-pointer pl-2 py-2 ${activeMenuItem === item.name ? ' bg-gray-500' : ''}`} onClick={() => setActiveMenuItem(item.name)}>
                    <div className=''>
                        {item.icon}
                    </div>
                    <div className=''>
                        {item.name}
                    </div>
                </li>
            ))}
        </ul>
    </div>
  );
};

export default SideBar;
