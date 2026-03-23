import { useState } from 'react'
import bgImage from './assets/bg1.jpg'; // Import the file directly

function App() {
  let [count, setCount] = useState<number>(0);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevents the page from reloading
    console.log("Logging in with:", { username, password });
    alert(`Welcome, ${username}!`);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('\web_cms\my-clinic-app\src\assets\bg1.jpg')" }}
    >

      <form action="">
        <div>
            <label className="block text-white text-sm mb-1 ml-1">Username</label>
            <input 
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 rounded-xl bg-white/70 border-none focus:ring-2 focus:ring-indigo-400 outline-none text-gray-800 placeholder-gray-500 transition"
              required
            />
          </div>
          <div>
            <label className="block text-white text-sm mb-1 ml-1">Password</label>
            <input 
              type="text"
              placeholder="Enter your password"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 rounded-xl bg-white/70 border-none focus:ring-2 focus:ring-indigo-400 outline-none text-gray-800 placeholder-gray-500 transition"
              required
            />
          </div>

          <div>
            <button onClick={(){
              console.log("button clicked");
            }}>Login</button>
          </div>
      </form>
      <br />
     
    </div>
  );
}

export default App