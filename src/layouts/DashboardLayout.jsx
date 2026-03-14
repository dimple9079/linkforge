import { useState , useEffect, use } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import MobileMenu from "../components/MobileMenu";
import ThemeToggle from "../components/ThemeToggle";
import { ToastContainer , toast} from "react-hot-toast";
import { motion } from "framer-motion";

export default function DashboardLayout() {
    const [mobileMenuopen, setMobileMenuOpen] = useState(false);
    const [theme, setTheme] = useState("dark");

    useEffect(() => {
        document.documentElement.className=theme;
    }, [theme]);

    useEffect(() => {
        toast.success("Welcome to LinkForge Dashboard!");
    }, []);

    return (    
        <div className="flex min-h-screen bg-gray-900 text-gray-100">
            <Sidebar className="hidden lg:block"/>

            <MobileMenu
                isOpen={mobileMenuopen}
                toggle={() => setMobileMenuOpen(!mobileMenuopen)}
            />

            <div className="flex-1 flex flex-col">
                <Navbar 
                    openMobileMenu={() => setMobileMenuOpen(true)}
                    theme={theme}
                    toggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")}
                />

                <main className="p-4 flex-1">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0}}
                        transition={{ duration: 0.3 }}
                    >
                        <Outlet />
                    </motion.div>

                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <motion.div
                            className="bg-gray-800 rounded-lg shadow h-32 animate-pulse"
                            whileHover={{ Scale: 1.05 }}/>
                    
                        <motion.div
                                className="bg-gray-800 rounded-lg shadow h-32 animate-pulse"
                                whileHover={{ Scale: 1.05 }}/>

                        <motion.div
                                className="bg-gray-800 rounded-lg shadow h-32 animate-pulse"
                                whileHover={{ Scale: 1.05 }}/>

                    </div>

                    <div className="mt-8 text-center text-gray-400">
                        <p> No link created yet.</p>
                        <button className="mt-2 px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-500
                        focus:outline-none focus:ring-2 focus:ring-indigo-400" 
                        onClick={() => toast("Create your first links!!!")}>
                            Create Link
                        </button>
                    </div>
                </main>
            </div>
            <ToastContainer position="top-right" />
        </div>
    );
}