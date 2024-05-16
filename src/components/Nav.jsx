import { useState } from 'react';
import { Link } from 'react-router-dom';
import UseReadingProgress from '../hooks/UseReadingProgress';
import AuthNav from './AuthNav';

const Nav = () => {
    const [openMenu, setOpenMenu] = useState(false);
    const completion = UseReadingProgress();
    const pathname = (window && window.location) ? window.location.pathname : '';

    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/books', label: 'Books' },
        { path: '/authors', label: 'Authors' },
        { path: '/categories', label: 'Categories' },
        { path: '/orders', label: 'Orders' },
        { path: '/users', label: 'User' }
    ];

    function toggleMenu() {
        setOpenMenu(!openMenu);
    }

    const inactivea = 'hover:bg-blue-600 hover:text-white bg-gray-200 text-gray-500 w-[100%] md:max-w-[100px]  text-center p-1 rounded-md';
    const activea = "hover:bg-blue-600 hover:text-white bg-blue-600 w-[100%] md:max-w-[100px]  text-center p-1 rounded-md bg-blue-600 text-white text-white text-white";


    return (
        <header className='z-50 pt-3 bg-white text-blue-900 w-[100vw] shadow-md fixed top-0'>
            <nav className='flex justify-between items-center w-[92%] mx-auto'>
                <Link to={"/"}>
                    <div className='font-capriola text-[30px] font-bold'>
                        <span className='text-blue-600'>B</span>ookSore
                    </div>
                </Link>

                <div className={`absolute md:static duration-1000 bg-white min-h-[100vh] md:min-h-fit  ${openMenu === false ? 'left-[-100%]' : 'left-0'} top-[100%] right-0 w-[100vw] md:w-[60vw] flex justify-center px-5`}>
                    <ul className='flex md:flex-row flex-col w-[80vw] items-center justify-start md:justify-center md:items-center text-[25px] md:text-[18px] md:gap-[3vw] gap-8 pt-20 md:pt-0'>
                        {navLinks.map((link, index) => (
                            <Link key={index} to={link.path} className='w-[100%]' onClick={toggleMenu}>
                                <div className='overflow-hidden z-50 w-[100%] h-[45.5px] md:h-fit relative md:static'>
                                    <li className={`${pathname === link.path ? activea : inactivea} duration-1000 absolute md:static top-0 z- ${openMenu === true ? "top-0" : "top-[100%]"}`}>
                                        {link.label}
                                    </li>
                                </div>
                            </Link>
                        ))}
                    </ul>
                </div>

                <div className='flex items-center gap-6 visible md:hidden'>
                    <div className='md:hidden' onClick={toggleMenu}>
                        {!openMenu && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 cursor-pointer md:hidden">
                            <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                        </svg>}
                        {openMenu && <span className='cursor-pointer '>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </span>}
                    </div>
                </div>
            </nav>
            <span style={{ transform: `translateX(${completion - 100}%)` }} className='h-[1px] outline outline-1 outline-blue-500 w-full absolute bottom-0 bg-blue-500' />
            <AuthNav />
        </header>
    )
}

export default Nav;
