"use client";
import React from "react";
import { useAuthContext } from "@/app/provider";
import Modal from "@/components/Modal";
import Loader from "@/components/Loader";

const Layout = ({ children }) => {
  const { isAuth, loading } = useAuthContext();
  if (loading) {
    return <Loader />;
  }

  if (!isAuth && !loading) {
    return (
      <Modal
        title="First Sign In to Post a Job"
        button1Title="Sign In /  Create a Account"
        button2Title="false"
        button1Action={() => router.push("/login")}
        button2Action=""
      ></Modal>
    );
  }
  return (
    <>
      {/* Main Content */}
      <div className="flex-1 p-6 sm:pl-6">{children}</div>
    </>
  );
};

export default Layout;
