"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

function Signup() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [buttonDisable, setbuttonDisable] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("SignUp Success", response.data);
      router.push("/login");
      toast.success("Successfully signed up");
    } catch (error: any) {
      console.log("Signup Failed", error?.message);
      toast.error(error?.message);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.username.length > 0 &&
      user.password.length > 0
    ) {
      setbuttonDisable(false);
    } else {
      setbuttonDisable(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="my-5 p-2 rounded-lg border border-white">
        {loading ? "Processing" : "Signup"}
      </h1>
      <hr />
      <label htmlFor="username">username</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="username"
        type="text"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="username"
      />
      <label htmlFor="email">email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="email"
        type="text"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />
      <label htmlFor="password">password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      <button
        onClick={onSignup}
        className="p-2 border border-gray-300 bg-slate-300 text-black rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        disabled={buttonDisable}
      >
        {buttonDisable ? "Please Fill all Fields" : "Signup"}
      </button>
      <Link href="/login">Visit login page</Link>
    </div>
  );
}

export default Signup;
