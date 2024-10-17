import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PharmacyRegistration = () => {
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    address: "",
    phone_number: "",
    open_hour: "",
    close_hour: "",
    latitude: null,
    longitude: null,
  });

  const [loading, setLoading] = useState(false);
  const [locationStatus, setLocationStatus] = useState("pending"); // pending, success, error
  const [submitStatus, setSubmitStatus] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData((prev) => ({
            ...prev,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }));
          setLocationStatus("success");
        },
        (error) => {
          console.error("Error getting location:", error);
          setLocationStatus("error");
        }
      );
    } else {
      setLocationStatus("error");
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitStatus(null);

    try {
      console.log(formData);
      const response = await axios.post(
        "http://localhost:9090/userApp/createPharmacy",
        formData
      );
      console.log(response.data);
      setSubmitStatus({
        type: "success",
        message:
          "Registration submitted successfully. Our team will contact you shortly for verification.",
      });
      // navigate("/");
    } catch (error) {
      console.log(error);
      setSubmitStatus({
        type: "error",
        message: "Registration failed. Please try again or contact support.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" app  min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Nav />

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Important Notice Banner */}
        <div className="mb-8 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
          <div className="flex items-start space-x-3">
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
            <div>
              <h3 className="text-sm font-medium text-blue-800">
                Important Registration Information
              </h3>
              <div className="mt-2 text-sm text-blue-700 space-y-1">
                <p>
                  • Please ensure all details are accurate and match your
                  official documents.
                </p>
                <p>
                  • We will conduct a phone verification call to confirm your
                  registration.
                </p>
                <p>
                  • Have your pharmacy license and other relevant documents
                  ready for verification.
                </p>
                <p>
                  • Location access is required to verify your pharmacy's
                  physical location.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Form */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-extrabold text-gray-900">
                Pharmacy Registration
              </h1>
              <p className="mt-2 text-gray-600">
                Complete the form below to register your pharmacy
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Pharmacy Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700"
                    >
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      id="city"
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.city}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone_number"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone_number"
                      id="phone_number"
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.phone_number}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Complete Address *
                  </label>
                  <textarea
                    name="address"
                    id="address"
                    required
                    rows={3}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="open_hour"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Opening Time *
                    </label>
                    <input
                      type="time"
                      name="open_hour"
                      id="open_hour"
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.open_hour}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="close_hour"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Closing Time *
                    </label>
                    <input
                      type="time"
                      name="close_hour"
                      id="close_hour"
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.close_hour}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                {/* Location Status */}
                <div className="rounded-md bg-gray-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      {locationStatus === "pending" && (
                        <svg
                          className="h-5 w-5 text-gray-400 animate-spin"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          />
                        </svg>
                      )}
                      {locationStatus === "success" && (
                        <svg
                          className="h-5 w-5 text-green-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                      {locationStatus === "error" && (
                        <svg
                          className="h-5 w-5 text-red-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      )}
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-800">
                        Location Status
                      </h3>
                      <div className="mt-2 text-sm text-gray-600">
                        {locationStatus === "pending" &&
                          "Detecting your location..."}
                        {locationStatus === "success" &&
                          "Location detected successfully"}
                        {locationStatus === "error" && (
                          <span className="text-red-600">
                            Unable to detect location. Please ensure location
                            access is enabled in your browser.
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={loading || locationStatus === "error"}
                  className={`w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors duration-200
                    ${
                      loading || locationStatus === "error"
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    }`}
                >
                  {loading ? "Submitting..." : "Submit Registration"}
                </button>
              </div>

              {/* Status Messages */}
              {submitStatus && (
                <div
                  className={`mt-4 p-4 rounded-md ${
                    submitStatus.type === "success"
                      ? "bg-green-50 text-green-800"
                      : "bg-red-50 text-red-800"
                  }`}
                >
                  {submitStatus.message}
                </div>
              )}
            </form>
          </div>
        </div>

        {/* What happens next section */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            What happens next?
          </h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-600 font-medium">
                  1
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">
                  Our team will review your registration details within 1-2
                  business days.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-600 font-medium">
                  2
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">
                  We will conduct a phone verification call to confirm your
                  details.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-600 font-medium">
                  3
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">
                  Upon successful verification, you will receive login
                  credentials via email.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmacyRegistration;
