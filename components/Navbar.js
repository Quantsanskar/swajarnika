"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"

export default function Navbar({ userRole, toggleRole, setSidebarOpen }) {
    const router = useRouter()
    const [dropdownOpen, setDropdownOpen] = useState(false)

    return (
        <nav className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500 md:hidden"
                        >
                            <svg
                                className="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <div className="flex-shrink-0 flex items-center">
                            <a href="/" className="text-2xl font-bold text-teal-600">
                                Swajarnika
                            </a>
                        </div>
                        <div className="hidden md:ml-6 md:flex md:space-x-8">
                            <a href="/dashboard" className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${router.pathname === "/dashboard"
                                ? "border-teal-500 text-gray-900"
                                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                }`}>



                                Dashboard
                            </a>

                            <a href="/patients" className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${router.pathname.startsWith("/patients")
                                ? "border-teal-500 text-gray-900"
                                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                }`}>



                                Patients
                            </a>

                            <a href="/chat" className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${router.pathname === "/chat"
                                ? "border-teal-500 text-gray-900"
                                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                }`}>



                                AI Assistant
                            </a>

                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <button
                                onClick={toggleRole}
                                className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                            >
                                <span>
                                    {userRole === "doctor" && "Doctor Mode"}
                                    {userRole === "assistant" && "Assistant Mode"}
                                    {userRole === "patient" && "Patient Mode"}
                                    {userRole === "hospital" && "Hospital Mode"}
                                    {userRole === "admin" && "Admin Mode"}
                                </span>
                            </button>
                        </div>
                        <div className="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center">
                            <button className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                                <span className="sr-only">View notifications</span>
                                <svg
                                    className="h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                    />
                                </svg>
                            </button>

                            <div className="ml-3 relative">
                                <div>
                                    <button
                                        onClick={() => setDropdownOpen(!dropdownOpen)}
                                        className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                                    >
                                        <span className="sr-only">Open user menu</span>
                                        <div className="h-8 w-8 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold">
                                            {userRole === "doctor" && "D"}
                                            {userRole === "assistant" && "A"}
                                            {userRole === "patient" && "P"}
                                            {userRole === "hospital" && "H"}
                                            {userRole === "admin" && "A"}
                                        </div>
                                    </button>
                                </div>
                                {dropdownOpen && (
                                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-10">
                                        <a href="/profile">
                                            <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</a>
                                        </a>
                                        <a href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            Settings
                                        </a>
                                        <a href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            Sign out
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

