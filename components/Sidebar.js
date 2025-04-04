"use client"

import { useRouter } from "next/router"
import Link from "next/link"

export default function Sidebar({ userRole, activeTab, setActiveTab, isOpen, setIsOpen }) {
    const router = useRouter()

    const handleTabClick = (tab) => {
        if (setActiveTab) {
            setActiveTab(tab)
        } else {
            // If we're not on the dashboard, navigate to it with the selected tab
            router.push(`/dashboard?tab=${tab}`)
        }
        if (window.innerWidth < 768) {
            setIsOpen(false)
        }
    }

    return (
        <>
            {/* Mobile sidebar backdrop */}
            {isOpen && (
                <div className="fixed inset-0 z-20 bg-gray-600 bg-opacity-75 md:hidden" onClick={() => setIsOpen(false)}></div>
            )}

            {/* Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 transition-transform duration-300 ease-in-out md:static md:h-auto md:w-64 md:flex-shrink-0`}
            >
                <div className="h-full flex flex-col">
                    <div className="flex items-center justify-between h-16 px-4 border-b md:hidden">
                        <div className="text-xl font-bold text-teal-600">Swajarnika</div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500"
                        >
                            <svg
                                className="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto py-4">
                        <nav className="px-2 space-y-1">
                            <button
                                onClick={() => handleTabClick("overview")}
                                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full ${activeTab === "overview"
                                        ? "bg-teal-100 text-teal-900"
                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                    }`}
                            >
                                <svg
                                    className={`mr-3 h-5 w-5 ${activeTab === "overview" ? "text-teal-500" : "text-gray-400 group-hover:text-gray-500"
                                        }`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                    />
                                </svg>
                                Overview
                            </button>

                            <button
                                onClick={() => handleTabClick("patients")}
                                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full ${activeTab === "patients"
                                        ? "bg-teal-100 text-teal-900"
                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                    }`}
                            >
                                <svg
                                    className={`mr-3 h-5 w-5 ${activeTab === "patients" ? "text-teal-500" : "text-gray-400 group-hover:text-gray-500"
                                        }`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                    />
                                </svg>
                                Patients
                            </button>

                            {userRole !== "patient" && (
                                <button
                                    onClick={() => handleTabClick("visits")}
                                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full ${activeTab === "visits"
                                            ? "bg-teal-100 text-teal-900"
                                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                        }`}
                                >
                                    <svg
                                        className={`mr-3 h-5 w-5 ${activeTab === "visits" ? "text-teal-500" : "text-gray-400 group-hover:text-gray-500"
                                            }`}
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        />
                                    </svg>
                                    Visits
                                </button>
                            )}

                            {userRole === "patient" && (
                                <button
                                    onClick={() => handleTabClick("medications")}
                                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full ${activeTab === "medications"
                                            ? "bg-teal-100 text-teal-900"
                                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                        }`}
                                >
                                    <svg
                                        className={`mr-3 h-5 w-5 ${activeTab === "medications" ? "text-teal-500" : "text-gray-400 group-hover:text-gray-500"
                                            }`}
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                                        />
                                    </svg>
                                    Medications
                                </button>
                            )}

                            <button
                                onClick={() => handleTabClick("chat")}
                                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full ${activeTab === "chat"
                                        ? "bg-teal-100 text-teal-900"
                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                    }`}
                            >
                                <svg
                                    className={`mr-3 h-5 w-5 ${activeTab === "chat" ? "text-teal-500" : "text-gray-400 group-hover:text-gray-500"
                                        }`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                                    />
                                </svg>
                                AI Assistant
                            </button>

                            {(userRole === "hospital" || userRole === "admin") && (
                                <button
                                    onClick={() => handleTabClick("settings")}
                                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full ${activeTab === "settings"
                                            ? "bg-teal-100 text-teal-900"
                                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                        }`}
                                >
                                    <svg
                                        className={`mr-3 h-5 w-5 ${activeTab === "settings" ? "text-teal-500" : "text-gray-400 group-hover:text-gray-500"
                                            }`}
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                    Settings
                                </button>
                            )}
                        </nav>
                    </div>

                    <div className="flex-shrink-0 border-t border-gray-200 p-4">
                        <a href="/" className="group block w-full flex items-center">
                            
                                <div className="flex-shrink-0">
                                    <div className="h-10 w-10 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold">
                                        {userRole === "doctor" && "D"}
                                        {userRole === "assistant" && "A"}
                                        {userRole === "patient" && "P"}
                                        {userRole === "hospital" && "H"}
                                        {userRole === "admin" && "A"}
                                    </div>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                                        {userRole === "doctor" && "Dr. Sarah Johnson"}
                                        {userRole === "assistant" && "Alex Thompson"}
                                        {userRole === "patient" && "John Doe"}
                                        {userRole === "hospital" && "City Hospital"}
                                        {userRole === "admin" && "Admin User"}
                                    </p>
                                    <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700 capitalize">{userRole}</p>
                                </div>
                            </a>
                       
                    </div>
                </div>
            </div>
        </>
    )
}

