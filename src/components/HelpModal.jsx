"use client"
import React, { useState } from 'react';
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";

const HelpComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      {/* Help Button */}
      <div 
        onClick={openModal} 
        className="fixed bottom-6 right-6 text-sm bg-zinc-100 border-[1px] border-zinc-200/80 text-zinc-600 px-2 py-1 rounded-lg cursor-pointer shadow-sm hover:bg-background transition-colors"
      >
        Help ?
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 relative">
            <button 
              onClick={closeModal} 
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              <IoIosClose size={32} />
            </button>
            
            <h2 className="text-xl font-bold mb-4">Need Help?</h2>
            <p className="mb-4">Submit an error or reach out to us</p>

            <div className="flex space-x-4">
              {/* LinkedIn DM Button */}
              <a 
                href="https://www.linkedin.com/messaging" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors w-full"
              >
                <FaLinkedinIn className="mr-2" />
                LinkedIn DM
              </a>

              {/* X (Twitter) DM Button */}
              <a 
                href="https://x.com/messages" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors w-full"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="white" 
                  className="mr-2"
                >
                  <path d="M18.901 1.153h3.68l-8.04 9.557L24 22.846h-7.406l-5.8-7.584-6.638 7.584H1.474l8.659-9.876L0 1.154h7.594l5.243 6.932ZM17.05 20.806h2.041L7.041 3.268H4.835Z"/>
                </svg>
                X DM
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HelpComponent;