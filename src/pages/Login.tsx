import { useState } from "react";
import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      const res = await signInWithPopup(auth, provider);
      await setDoc(doc(db, "users", res.user.uid), {
        email: res.user.email,
        name: res.user.displayName,
        joined: new Date()
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (isRegister) {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, "users", res.user.uid), {
          email: res.user.email,
          name: res.user.displayName || email,
          joined: new Date()
        });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center">
        <div className="mb-6 flex flex-col items-center">
          <img src="/logo192.png" alt="StudyZone Logo" className="w-16 h-16 mb-2" />
          <h1 className="text-2xl font-bold text-blue-700 mb-1">StudyZone</h1>
          <p className="text-gray-500 text-sm">Sign in to continue</p>
        </div>
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow mb-4 transition disabled:opacity-60"
          disabled={loading}
        >
          <svg className="w-5 h-5" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M24 9.5c3.54 0 6.7 1.22 9.19 3.22l6.85-6.85C36.68 2.36 30.74 0 24 0 14.82 0 6.71 5.08 2.69 12.44l7.98 6.2C12.13 13.13 17.62 9.5 24 9.5z"/><path fill="#34A853" d="M46.1 24.55c0-1.64-.15-3.22-.42-4.74H24v9.01h12.42c-.54 2.9-2.18 5.36-4.65 7.01l7.19 5.6C43.98 37.36 46.1 31.41 46.1 24.55z"/><path fill="#FBBC05" d="M10.67 28.65c-1.13-3.36-1.13-6.99 0-10.35l-7.98-6.2C.99 16.09 0 19.91 0 24c0 4.09.99 7.91 2.69 11.9l7.98-6.2z"/><path fill="#EA4335" d="M24 48c6.48 0 11.93-2.14 15.9-5.82l-7.19-5.6c-2.01 1.35-4.59 2.15-8.71 2.15-6.38 0-11.87-3.63-14.33-8.94l-7.98 6.2C6.71 42.92 14.82 48 24 48z"/><path fill="none" d="M0 0h48v48H0z"/></g></svg>
          Continue with Google
        </button>
        <div className="w-full flex items-center my-4">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="mx-2 text-gray-400 text-xs uppercase">or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        <form onSubmit={handleEmailAuth} className="w-full flex flex-col gap-3">
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
          <input
            type="password"
            placeholder="Password"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            autoComplete={isRegister ? "new-password" : "current-password"}
          />
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 rounded-lg shadow transition disabled:opacity-60"
            disabled={loading}
          >
            {isRegister ? "Create Account" : "Sign In"}
          </button>
        </form>
        <div className="mt-4 text-sm text-gray-600">
          {isRegister ? (
            <>
              Already have an account?{' '}
              <button className="text-blue-600 hover:underline" onClick={() => setIsRegister(false)} disabled={loading}>
                Sign In
              </button>
            </>
          ) : (
            <>
              Don't have an account?{' '}
              <button className="text-blue-600 hover:underline" onClick={() => setIsRegister(true)} disabled={loading}>
                Create Account
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
