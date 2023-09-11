import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios directly
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isUserDropdownOpen, setUserDropdownOpen] = useState(false);
  const [user, setUser] = useState(null); // State to store user data

  const toggleUserDropdown = () => {
    setUserDropdownOpen(!isUserDropdownOpen);
  };

  // Function to fetch user data when the component mounts
  const fetchUserData = async () => {
    try {
      const response = await axios.get('/member_details'); // Replace with your user profile endpoint
      setUser(response.data); // Set user data in the state
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // Use useEffect to fetch user data when the component mounts
  useEffect(() => {
    fetchUserData();
  }, []); // The empty dependency array ensures it only runs once


  const handleSignout = async () => {
    try {
      await axios.delete('/users/sign_out'); 
      localStorage.removeItem('authToken'); // Clear the authentication token

      // Perform any additional sign-out actions, such as redirecting to the login page
    } catch (error) {
      console.error('Sign-out error:', error);
    }
  };


  return (
    <div>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>

              {/* <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="FlowBite Logo" /> */}
              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                EROSTECH
              </span>
            </div>
            <div className="flex items-center">
             
              <div className="relative inline-block text-left">
                <button
                  type="button"
                  className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  aria-expanded={isUserDropdownOpen ? 'true' : 'false'}
                  data-dropdown-toggle="dropdown-user"
                  onClick={toggleUserDropdown}
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="w-8 h-8 rounded-full"
                    src={user?.image || 'default-profile-image-url.jpg'} // Use the user's profile picture URL if available, otherwise, use a default image
                    alt="user photo"
                  />
                </button>

                {isUserDropdownOpen && (
                  <div
                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 divide-y divide-gray-100"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-dropdown"
                  >
                    <div className="px-4 py-3" role="none">
                      <p className="text-sm text-gray-900 dark:text-white" role="none">
                        {user?.name || 'Loading...'} {/* Display user's name */}
                      </p>
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                        {user?.email || 'Loading...'} {/* Display user's email */}
                      </p>
                    </div>
                    <ul className="py-1" role="none">
                    <li>
              <Link
                to="/dashboard" // Replace with your dashboard route
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                role="menuitem"
              >
                Dashboard
              </Link>
            </li>
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                          role="menuitem"
                        >
                          Settings
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                          role="menuitem"
                        >
                          Earnings
                        </a>
                      </li>
                      <li>
              <button
                type="button"
                onClick={handleSignout}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                role="menuitem"
              >
                Sign out
              </button>
            </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className="fixed top-12 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar"
      >
        <Sidebar />
      </aside>
    </div>
  );
}

export default Navbar;
