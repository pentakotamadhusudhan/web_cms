import bgImage from '../assets/bg1.jpg'; // Ensure path is correct relative to this file

// 1. Define an Interface for your Props (Best practice for TypeScript)
interface LoginProps {
  username: string;
  setUsername: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

// 2. Use 'export const' instead of 'export LoginPage'
export const LoginPage = ({ 
  username, 
  setUsername, 
  password, 
  setPassword, 
  handleSubmit 
}: LoginProps) => (
  <div
    className="min-h-screen bg-cover bg-center flex items-center justify-center"
    style={{ backgroundImage: `url(${bgImage})` }}
  >
    <div className="bg-black/40 p-8 rounded-2xl backdrop-blur-md border border-white/10 w-96">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">Clinic Login</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-white text-sm mb-1 ml-1 font-medium">Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 rounded-xl bg-white/20 border border-white/10 focus:ring-2 focus:ring-indigo-400 outline-none text-white placeholder-gray-300 transition backdrop-blur-sm"
            required
          />
        </div>
        
        <div>
          <label className="block text-white text-sm mb-1 ml-1 font-medium">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-xl bg-white/20 border border-white/10 focus:ring-2 focus:ring-indigo-400 outline-none text-white placeholder-gray-300 transition backdrop-blur-sm"
            required
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-indigo-500/30 active:scale-95"
        >
          Login
        </button>
      </form>
    </div>
  </div>
);