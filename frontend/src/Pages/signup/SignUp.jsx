import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import GenderCheckbox from "./GenderCheckBox";
import useSignup from "../../hooks/useSignup";
import { InfinitySpin } from 'react-loader-spinner';

const SignUp = () => {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        fullName: "",
        username: "",
		password: "",
		confirmPassword: "",
		gender: "",
    })

    const {loading, signup} = useSignup();

    const handleCheckboxChange = (gender) => {
        setInputs({ ...inputs, gender });
        
    }

    const handleSubmit = async (e) => {
		e.preventDefault();

		await signup(inputs)
	};

    return (
        <div className="flex w-[440px] flex-col items-center justify-center px-6 py-8 mx-auto sm:max-w-[500px] mt-10 lg:py-0">
            <div className="sm:w-[500px] w-[400px] p-6 rounded-lg shadow-md bg-gray-600">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl text-center font-bold leading-tight tracking-tight md:text-2xl text-white">
                        Register To ChatApp
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label
                                htmlFor="fullName"
                                className="block mb-2 text-sm font-medium text-white"
                            >
                                Full Name
                            </label>
                            <input
                                type="text"
                                value={inputs.fullName}
							    onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
                                name="fullName"
                                id="fullName"
                                className=" border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-50  placeholder-gray-600 text-black focus:ring-blue-500 focus:border-blue-500"
                                placeholder="name@company.com"
                                required=""
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="username"
                                className="block mb-2 text-sm font-medium text-white"
                            >
                                User Name
                            </label>
                            <input
                                type="text"
                                value={inputs.username}
                                onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
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
                                value={inputs.password}
                                onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                                name="password"
                                id="password"
                                placeholder="••••••••"
                                className=" border border-gray-300  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-50  placeholder-gray-600 text-black focus:ring-blue-500 focus:border-blue-500"
                                required=""
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="block mb-2 text-sm font-medium text-white"
                            >
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                value={inputs.confirmPassword}
							    onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
                                name="confirmPassword"
                                id="confirmpassword"
                                placeholder="••••••••"
                                className=" border border-gray-300  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-50  placeholder-gray-600 text-black focus:ring-blue-500 focus:border-blue-500"
                                required=""
                            />
                        </div>

                        {/* GENDER CHECKBOX GOES HERE */}
                        <GenderCheckbox onCheckboxChange = {handleCheckboxChange} selectGender={inputs.gender}/>

                        <button
                            type="submit"
                            className="sm:ml-24 ml-24 text-center bg-slate-200 w-28 py-2"
                            style={{ borderRadius: "10px" }}
                            disabled = {loading}
                        >
                            {loading ? <InfinitySpin visible={true} width="100" color="black" ariaLabel="infinity-spin-loading"/> : "Signup"}
                        </button>
                        <p className="text-sm font-light text-gray-200">
                            Already have an account!{" "}
                            <Link
                                to="/login"
                                className="font-medium text-primary-600 hover:underline text-primary-500"
                                style={{ color: "blue" }}
                            >
                                login
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
