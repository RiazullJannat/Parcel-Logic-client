import { Link } from 'react-router-dom';
import logo from '../../assets/logo.jpg'
import { MdNotificationsActive } from 'react-icons/md';
import { FaHome } from 'react-icons/fa';
import { IoLogIn, IoLogOut, IoMenu } from 'react-icons/io5';
import { GiArchiveRegister } from 'react-icons/gi';
const Navbar = () => {
    const user = false;
    const links =
        <>
            <li>
                <Link><FaHome /> Home</Link>
            </li>
            <li>
                <Link><MdNotificationsActive />Notifications </Link>
            </li>
        </>
    const auth =
        user ?
            <>
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost ">
                        <img src='' alt="" className='h-8 w-8 md:h-9 md:w-9 rounded-full' />
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3  w-36 p-2 shadow right-0">
                        <p>{user?.displayName}</p>
                        <li><button><IoLogOut />Signout</button></li>
                    </ul>
                </div>
            </>
            :
            <>
                <ul>
                    <li>
                        <Link><IoLogIn />Signin</Link>
                    </li>
                    <li>
                        <Link><GiArchiveRegister />Signup</Link>
                    </li>
                </ul>
            </>
    return (
        <div className="navbar fixed  bg-opacity-30  backdrop-blur-sm text-white">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <IoMenu />
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow bg-black opacity-10">
                        {
                            links
                        }
                    </ul>
                </div>
                <div className="btn btn-ghost md:text-xl ">
                    <span><img src={logo} className='h-9 w-9' /></span>
                    <span >PARCEL LOGIC</span>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {
                            links
                        }
                    </ul>
                </div>
            </div>
            <div className="navbar-end">
                {auth}
            </div>
        </div>
    );
};
export default Navbar;