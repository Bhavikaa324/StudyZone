import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const Dashboard = () => {
  const logout = async () => {
    await signOut(auth);
    // Remove Google session cookies if present
    window.localStorage.clear();
    window.sessionStorage.clear();
    // Optionally, redirect to login or home page
    window.location.reload();
  };

  return (
    <div>
      <header className="flex justify-between p-4 bg-gray-100">
        <h1 className="text-xl font-bold">📚 StudyZone</h1>
        <button onClick={logout} className="text-red-500">Logout</button>
      </header>
      <main className="p-4">
        <p>Welcome to your dashboard! 🚀</p>
      </main>
    </div>
  );
};

export default Dashboard;
