import '../index.css';
import { motion } from 'framer-motion';
import { 
    Users, Calendar, Activity, Clock, Plus, Search, Bell, LogOut, 
    LayoutDashboard, UserCog, FileBarChart, Settings 
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { getClinicDetails, LogoutApi } from '../services/api_call';
import type { ClinicModel } from '../models/clinics_models';
import { Link, useLocation, useNavigate } from 'react-router-dom';

// 1. Unified Menu Items (Logout removed from here to be handled by a button)
const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Patients', path: '/patients', icon: <Users size={20} /> },
    { name: 'Staff', path: '/staff', icon: <UserCog size={20} /> },
    { name: 'Reports', path: '/reports', icon: <FileBarChart size={20} /> },
    { name: 'Settings', path: '/clinic-settings', icon: <Settings size={20} /> },
];

const stats = [
    { label: "Total Patients", value: "1,284", icon: <Users />, color: "from-blue-500 to-cyan-400" },
    { label: "Appointments", value: "42", icon: <Calendar />, color: "from-indigo-500 to-purple-500" },
    { label: "Critical Cases", value: "5", icon: <Activity />, color: "from-rose-500 to-orange-400" },
    { label: "Wait Time", value: "18m", icon: <Clock />, color: "from-amber-500 to-orange-400" },
];

export default function FancyDashboard() {
    const [clinic, setClinic] = useState<ClinicModel | null>(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await getClinicDetails();
                setClinic(data);
            } catch (error) {
                console.error("API Error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const handleFullLogout = async () => {
        try {
            await LogoutApi(); // Notify backend
        } catch (e) {
            console.error("Logout API failed, clearing local data anyway");
        }
        setClinic(null); // Clear state
        localStorage.clear(); // Clear JWT
        navigate('/'); // Redirect
    };

    return (
        <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans overflow-x-hidden">
            {/* Animated Background */}
            <div className="fixed inset-0 overflow-hidden -z-10">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/10 blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/10 blur-[120px]" />
            </div>

            <div className="flex">
                {/* Sidebar Section */}
                <aside className="w-20 lg:w-64 min-h-screen bg-slate-900/50 backdrop-blur-xl border-r border-white/5 p-6 flex flex-col sticky top-0 h-screen">
                    <div className="flex items-center gap-3 mb-10">
                        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                            <Activity className="text-white" size={20} />
                        </div>
                        <span className="hidden lg:block font-bold text-xl tracking-tight text-white truncate">
                            {clinic?.clinic_name || 'Clinic CMS'}
                        </span>
                    </div>

                    <nav className="flex-1 space-y-2">
                        {menuItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <Link key={item.name} to={item.path}>
                                    <motion.div
                                        whileHover={{ x: 5 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`flex items-center gap-3 p-3 rounded-xl transition-all mb-1 ${
                                            isActive
                                                ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'
                                                : 'text-slate-400 hover:bg-white/5 border border-transparent'
                                        }`}
                                    >
                                        {item.icon}
                                        <span className="hidden lg:block font-medium">{item.name}</span>
                                    </motion.div>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Logout Button */}
                    <button 
                        onClick={handleFullLogout}
                        className="flex items-center gap-3 p-3 mt-auto text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all border border-transparent hover:border-rose-500/20 w-full"
                    >
                        <LogOut size={20} />
                        <span className="hidden lg:block font-medium">Logout Session</span>
                    </button>
                </aside>

                {/* Main Content Section */}
                <main className="flex-1 p-6 lg:p-10">
                    <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                            <h1 className="text-3xl font-bold text-white">Clinic Overview</h1>
                            <p className="text-slate-400 mt-1">{clinic?.subtitle}</p>
                        </motion.div>

                        <div className="flex items-center gap-4">
                            <div className="relative hidden sm:block">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                <input className="bg-slate-800/50 border border-white/10 rounded-full py-2 pl-10 pr-4 outline-none focus:ring-2 focus:ring-indigo-500/50 w-64 transition-all" placeholder="Search records..." />
                            </div>
                            <button className="p-2 bg-slate-800/50 border border-white/10 rounded-full hover:bg-slate-700 transition-colors relative">
                                <Bell size={20} />
                                <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full" />
                            </button>
                        </div>
                    </header>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ y: -5, scale: 1.02 }}
                                className="relative group overflow-hidden bg-slate-800/40 backdrop-blur-md p-6 rounded-3xl border border-white/5 hover:border-indigo-500/30 transition-all shadow-2xl"
                            >
                                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-4 shadow-lg`}>
                                    {stat.icon}
                                </div>
                                <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
                                <h3 className="text-3xl font-bold text-white mt-1 tracking-tight">{stat.value}</h3>
                            </motion.div>
                        ))}
                    </div>

                    {/* Table Section */}
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-slate-800/30 backdrop-blur-md rounded-3xl border border-white/5 p-8 shadow-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-white">Upcoming Appointments</h2>
                            <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl font-semibold transition-all active:scale-95 text-sm shadow-lg shadow-indigo-500/20">
                                <Plus size={18} /> Add Appointment
                            </button>
                        </div>
                        {/* Table content remains same... */}
                    </motion.div>
                </main>
            </div>
        </div>
    );
}