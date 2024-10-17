import React, { useState } from "react";
import Nav from "../components/Nav";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const SignIn = () => {
  const [user, setUser] = useState({ name: "", email: "" });
  const navigate = useNavigate();

  const verifyEmail = async (email) => {
    try {
      const response = await axios.post("http://localhost:9090/userApp/signIn", {
        email: email,
      });
      if (response.data.isValid) {
        navigate(`/adminPanel/${response.data.ph_id}`);
      } else {
        alert("You are not registered pharmacy on our system.");
      }
    } catch (error) {
      console.log(error);
      alert("login failed.");
    }
  };

  const handleLogin = async (codeResponse) => {
    try {
      const userdetails = jwtDecode(codeResponse.credential);
      setUser({ name: userdetails.name, email: userdetails.email });

      if (userdetails.email) {
        verifyEmail(userdetails.email);
      }
    } catch (error) {
      console.log(error);
      alert("Login Failed.");
    }
  };

  const handleRegistration = () => {

    navigate('/sign-up');

  };

  return (
    <div className=" app min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Nav />

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Warning Banner */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8 rounded-r-lg">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-yellow-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Restricted Access
              </h3>
              <p className="text-sm text-yellow-700 mt-1">
                This portal is exclusively for registered pharmacies.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="text-center">
              <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Pharmacy Dashboard Login
              </h1>
              <div className="mt-4 flex items-center justify-center">
                <span className="px-2 bg-blue-100 rounded-full">
                  <svg
                    className="h-6 w-6 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div className="mt-8">
              <div className="text-center">
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Access your pharmacy dashboard or register your pharmacy to
                  join our platform.
                </p>
              </div>

              <div className="mt-10">
                <div className="flex flex-col items-center justify-center space-y-6">
                  <div className="w-full max-w-sm">
                    <div className="space-y-6">
                      {/* Existing Google Login */}
                      <div className="flex flex-col items-center space-y-4">
                        <p className="text-sm font-medium text-gray-700">
                          Already registered? Sign in with Google
                        </p>
                        <GoogleLogin
                          onSuccess={ handleLogin }
                          onError={() => {
                            alert("Login Failed with Google.");
                          }}
                        />
                      </div>

                      {/* Registration Option */}
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-2 bg-white text-gray-500">
                            Or
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col items-center space-y-4">
                        <p className="text-sm font-medium text-gray-700">
                          New to our platform?
                        </p>
                        <button
                          onClick={handleRegistration}
                          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                        >
                          Register Your Pharmacy
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-8 py-6">
            <div className="text-center text-sm text-gray-500">
              Need help? Contact our support team at{" "}
              <a
                href="mailto:support@example.com"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                support@example.com
              </a>
            </div>
          </div>
        </div>

        {/* Additional Info Cards */}
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Registration Process
                </h3>
                <p className="mt-2 text-gray-600">
                  Learn about our pharmacy registration process and requirements
                  for joining our platform.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Help & Support
                </h3>
                <p className="mt-2 text-gray-600">
                  Get assistance with login issues or learn more about managing
                  your pharmacy dashboard.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
