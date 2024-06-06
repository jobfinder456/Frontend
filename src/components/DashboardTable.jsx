import React from "react";
import Link from "next/link";
import { RxExternalLink } from "react-icons/rx";

function DashboardTable({
  date,
  postId,
  jobTitle,
  onPay,
  isOk,
  createdBy,
  setModal,
  setPostIdToDelete,
  isHeader,
}) {
  return (
    <div
      className={`${
        isHeader ? "bg-background" : ""
      } relative z-10 flex justify-start items-center w-full px-[24px] py-[0.5rem] hover:bg-background active:bg-background rounded-[8px] text-[1rem]`}
      key={postId}
    >
      <h3 className="w-[15%] text-start">{date}</h3>

      <Link
        href={`/job/${postId}`}
        className="w-[25%] text-start font-medium flex items-center gap-[0.5rem]"
      >
        {jobTitle}{" "}
      </Link>

      <button
        onClick={() => onPay([postId])}
        className="w-[20%] text-start flex items-center gap-[0.5rem]"
      >
        {isOk ? (
          "Success"
        ) : isHeader ? (
          <>Payment Status</>
        ) : (
          <>
            Payment Needed!
            <RxExternalLink />
          </>
        )}
      </button>

      {!isHeader && (
        <>
          <h3>{createdBy}</h3>

          <div className="z-50 flex-grow flex justify-end items-center gap-[1rem]">
            <Link
              href={`/editpost/${postId}`}
              className=" bg-accent-blue-2 text-accent-blue-1 p-[12px] rounded-[0.5rem]"
            >
              Edit
            </Link>

            <button
              onClick={() => {
                setModal(true);
                setPostIdToDelete(postId);
              }}
              className=" bg-accent-red-2 text-accent-red-1 p-[12px] rounded-[0.5rem]"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default DashboardTable;
