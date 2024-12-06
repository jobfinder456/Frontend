"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const withAuth = (WrappedComponent) => {
  const AuthenticatedComponent = (props) => {
    const [showModal, setShowModal] = useState(false); // State to control modal visibility
    const router = useRouter();

    useEffect(() => {
      const isLogin = localStorage.getItem("isLogin");

      if (isLogin) {
        const loginDate = new Date(localStorage.getItem("loginDate")); // Retrieve login date
        const currentDate = new Date();
        const daysDifference =
          (currentDate.getTime() - loginDate.getTime()) / (1000 * 60 * 60 * 24); // Difference in days

        console.log;
        if (daysDifference > 30) {
          //setShowModal(true);
          //router.back(); // Redirect back if the user is inactive for more than 30 days
        }
      } else {
        setShowModal(true); // Show the login modal if not authenticated
      }
    }, [router]);

    const handleGoToLogin = () => {
      setShowModal(false);
      router.push("/signin"); // Redirect to login page
    };

    return (
        <>
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg text-center shadow-lg">
              <p className="text-lg mb-4">Please log in to access this page.</p>
              <button
                onClick={handleGoToLogin}
                className="mt-4 px-4 py-2 bg-accent-blue-1 text-white font-medium rounded-lg hover:bg-accent-blue-1 "
              >
                Go to Login
              </button>
            </div>
          </div>
        )}
        {!showModal && <WrappedComponent {...props} />}
      </>
    );
  };

  return AuthenticatedComponent;
};

export default withAuth;
