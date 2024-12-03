import React, { useState } from 'react'
import Logo from '../images/fixitnow-logo.png'
import Menu from '../images/menu.png'

const Navbar: React.FC = () => {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <nav className='w-full bg-black py-2 px-3 md:px-16 text-white text-sm md:text-base font-poppins relative'>
            <div className='flex items-center justify-between'>
                <div>
                    <a href="#">
                        <div className='flex items-center gap-x-2 md:gap-x-3'>
                            <img
                                src={Logo}
                                alt="Logo"
                                className='w-[30px] md:w-[40px]'
                                draggable={false}
                            />
                            <div className='select-none font-poppins text-lg md:text-2xl'>FIXITNOW</div>
                        </div>
                    </a>
                </div>
                <div className='flex items-center gap-x-1'>
                    <div
                        className={`absolute w-full md:w-fit top-[49px] bg-black left-0 md:static py-4 md:py-0 transition-all duration-500 ease-in-out transform md:translate-y-0 ${isOpen ? "translate-y-0 opacity-100" : "-translate-y-40"}`}
                    >
                        <ul className="block md:flex items-center">
                            <li className="mb-4 md:mb-0">
                                <a href="#">
                                    <span className="px-3 py-2 rounded-full md:hover:bg-secondary transition-colors duration-300 ease-in-out">
                                        About
                                    </span>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <span className="px-3 py-2 rounded-full md:hover:bg-secondary transition-colors duration-300 ease-in-out">
                                        Services
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <ul className='flex items-center gap-x-2 md:gap-x-4'>
                            <li>
                                <a href="#">
                                    <span className='px-3 py-2 rounded-full hover:bg-secondary'>Log in</span>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <span className='px-2 py-1 md:px-3 md:py-2 rounded-full bg-white text-black hover:opacity-90'>Sign up</span>
                                </a>
                            </li>
                            <li
                                onClick={() => setIsOpen(!isOpen)}
                                className='block md:hidden'
                            >
                                <img className='w-[20px]' src={Menu} alt="Menu icon" />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
