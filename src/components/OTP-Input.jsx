import React, { useRef, useState } from "react";
import PropTypes from "prop-types";

const OtpInput = ({
  length = 6, // Default number of digits
  onComplete = () => {}, // Callback for when OTP is complete
  className = "", // Optional class for input styling
}) => {
  const [otp, setOtp] = useState(Array(length).fill("")); // Array with `length` empty strings
  const inputRefs = useRef([]); // Array of refs for each input field

  const handleKeyDown = (e, index) => {
    if (
      !/^[0-9]{1}$/.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "Tab" &&
      !e.metaKey
    ) {
      e.preventDefault();
    }

    if ((e.key === "Delete" || e.key === "Backspace") && index > 0) {
      setOtp((prevOtp) => [
        ...prevOtp.slice(0, index - 1),
        "",
        ...prevOtp.slice(index),
      ]);
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleInput = (e, index) => {
    const { value } = e.target;
    if (/^[0-9]{1}$/.test(value)) {
      setOtp((prevOtp) => [
        ...prevOtp.slice(0, index),
        value,
        ...prevOtp.slice(index + 1),
      ]);

      if (index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      } else {
        // Call `onComplete` when the OTP is fully entered
        onComplete([...otp.slice(0, index), value].join(""));
      }
    }
  };

  const handleFocus = (e) => {
    e.target.select();
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text").slice(0, length);
    if (/^[0-9]+$/.test(text)) {
      const digits = text.split("").slice(0, length);
      setOtp(digits);
      inputRefs.current[digits.length - 1]?.focus();
      if (digits.length === length) {
        onComplete(digits.join(""));
      }
    }
  };

  return (
    <form id="otp-form" className="flex gap-2">
      {otp.map((digit, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          value={digit}
          onChange={(e) => handleInput(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onFocus={handleFocus}
          onPaste={handlePaste}
          ref={(el) => (inputRefs.current[index] = el)}
          className={`shadow-xs w-[20%] h-[15%] rounded-lg border-[2px] border-stroke bg-white p-2 text-center text-2xl font-medium text-zinc-800 outline-none sm:text-4xl dark:border-zinc-300 dark:bg-white/5 ${className}`}
        />
      ))}
    </form>
  );
};

// PropTypes for better type-checking
OtpInput.propTypes = {
  length: PropTypes.number,
  onComplete: PropTypes.func,
  className: PropTypes.string,
};

export default OtpInput;
