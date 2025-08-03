import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import { InfinitySpin } from "react-loader-spinner";

function Login() {

    const [username, setusername] = useState("");
    const [password, setPassword] = useState("");

    const {loading, login} = useLogin();

    const handleSubmit = async (e) => {
		e.preventDefault();

		await login(username, password)
	};

    return (
        <div className="flex flex-col w-[440px] sm:w-full items-center justify-center px-6 py-8  lg:py-0 sm:mt-40 mt-20">
            <div className="sm:w-[500px] w-[400px] p-6 rounded-lg shadow-md bg-gray-500 ">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl text-center font-bold leading-tight tracking-tight md:text-2xl text-white">
                        Login ChatApp
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label
                                htmlFor="username"
                                className="block mb-2 text-sm font-medium text-white"
                            >
                                UserName
                            </label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => {
                                    setusername(e.target.value);
                                }}
                                name="username"
                                id="username"
                                className=" border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-50  placeholder-gray-600 text-black focus:ring-blue-500 focus:border-blue-500"
                                placeholder="name@company.com"
                                required=""
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className="block mb-2 text-sm font-medium text-white"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                                name="password"
                                id="password"
                                placeholder="••••••••"
                                className=" border border-gray-300  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-50  placeholder-gray-600 text-black focus:ring-blue-500 focus:border-blue-500"
                                required=""
                            />
                        </div>

                        <button
                            type="submit"
                            className="sm:mx-36 ml-28 text-center bg-slate-200 px-5 py-2"
                            style={{ borderRadius: "10px" }}
                            disabled={loading}
                        >
                            {loading ? <InfinitySpin visible={true} width="100" color="black" ariaLabel="infinity-spin-loading"/> : "Login"}
                        </button>
                        <p className="text-sm font-light text-gray-200">
                            Don’t have an account yet{" "}
                            <Link
                                to="/signup"
                                className="font-medium text-primary-600 hover:underline text-primary-500"
                                style={{ color: "blue" }}
                            >
                                Sign up
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
