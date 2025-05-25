"use client";
import React, { useEffect, useState } from "react";
import { FaRegStar } from "react-icons/fa6";
import { IoIosClose } from "react-icons/io";
import { useAuthContext } from "@/app/provider";
import { motion, AnimatePresence } from "framer-motion";

export default function BookmarkAlert() {
  const { isAuth, loading } = useAuthContext();
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    // Don't process anything while loading
    if (loading) return;

    // Check if user is a job seeker (not authenticated)
    if (!isAuth) {
      const lastClosedDate = localStorage.getItem("bookmarkAlertClosedDate");

      console.log("lastClosedDate:", lastClosedDate);

      if (!lastClosedDate) {
        // First time viewing - show alert
        setShowAlert(true);
      } else {
        // Check if 5 days have passed since last closed
        const lastClosed = new Date(lastClosedDate);
        const currentDate = new Date();
        const daysDifference = Math.floor(
          (currentDate - lastClosed) / (1000 * 60 * 60 * 24)
        );

        if (daysDifference >= 5) {
          setShowAlert(true);
        }
      }
    }
  }, [isAuth, loading]);

  const handleClose = () => {
    setShowAlert(false);
    localStorage.setItem("bookmarkAlertClosedDate", new Date().toISOString());
  };

  // Don't render anything while loading or if alert shouldn't be shown
  if (loading || !showAlert) return null;

  return (
    <AnimatePresence>
      {showAlert && !isAuth && (
        <motion.div
          initial={{ y: 20, x: 40, opacity: 0 }}
          animate={{ y: 0, x: 0, opacity: 1 }}
          transition={{ delay: 8.5, duration: 0.3 }}
          exit={{ y: -20, opacity: 0,}}
          className="fixed right-4 sm:right-14 top-4 max-w-[220px] z-50 text-zinc-600 animate-in slide-in-from-top duration-300 fade-in"
        >
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 8.5, duration: 0.3 }}
            exit={{ y: -20, opacity: 0 }}
            className="relative flex flex-col p-[1rem] rounded-[0.8rem] bg-white border-[1px] border-background shadow-lg text-end transition-all duration-300 ease-in-out hover:shadow-xl"
          >
            <img
              src="/images/arrow.png"
              className="w-[8rem] absolute -top-1 scale-x-[-1] rotate-12 opacity-90"
              alt="arrow decoration"
            />
            <IoIosClose
              size={24}
              className="absolute top-2 right-2 cursor-pointer text-zinc-400 transition-colors hover:text-zinc-600"
              onClick={handleClose}
            />
            <div className="pt-[2.2rem]">
              <h3 className="text-base font-semibold flex items-center justify-end gap-1 text-zinc-950">
                <FaRegStar size={16} />
                Bookmark it !
              </h3>
              <p className="text-xs font-light">
                for your next career move<br></br>
                <span className="font-semibold">50 +</span> fresh jobs posted
                daily
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
