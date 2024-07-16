import { useState } from 'react';
import Header from '~/components/DashboardComponents/Header';
import Sidebar from '~/components/DashboardComponents/Sidebar';
// import Home from '~/components/DashboardComponents/Home';
import '~/Style/Dashboard.css';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

interface Props {
  isAdmin: number;
}

const Dashoard = (props: Props) => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
  const { pathname = '' } = useLocation();
  const to = '/landingpage';

  console.log("Dashboard =>>>>>>>>>>>> " + props.isAdmin);

  return (
    <>
      {props.isAdmin === 1 ?
        (<div className='grid-container'>
          <Header OpenSidebar={OpenSidebar} />
          <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
          <Outlet />
        </div>) :
        <Navigate state={{ redirect: pathname }} to={to} />}
    </>

  )

};

export default Dashoard;


