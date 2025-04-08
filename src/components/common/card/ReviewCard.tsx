import React, { useState } from "react";
import { IoIosStarOutline } from "react-icons/io";
import { MdOutlineStar } from "react-icons/md";

interface Review {
  id: number;
  userName: string;
  postedDate: string;
  review: string;
  stars: number;
}

const ReviewCard: React.FC<{ review: Review }> = ({ review }) => {
  const maxStars = 5;

  return (
    <>
      <div key={review.id} className="md:p-5 lg:p-10">
        <div className="bg-white shadow-[0px_0px_20px_rgba(220,220,230,1)] border-2 rounded-md p-4 m-auto w-full flex flex-col justify-between gap-4 h-[200px] md:h-[200px]">
          {/* Stars and Date */}
          <div className="flex justify-between items-center">
            <div className="flex text-sm">
              {[...Array(maxStars)].map((_, idx) => (
                <div key={idx}>
                  {idx < review.stars ? (
                    <MdOutlineStar size={20} className="text-[#f99e00]" />
                  ) : (
                    <IoIosStarOutline size={20} className="text-[#f99e00]" />
                  )}
                </div>
              ))}
            </div>
            <span className="text-sm text-slate-700 font-semibold">
              {review.postedDate}
            </span>
          </div>

          {/* User Name */}
          <div className="font-Lexend flex items-center gap-2">
            <span className="font-semibold text-sm drop-shadow-lg">
              {review.userName}
            </span>
          </div>

          {/* Review Text */}
          <div className="flex-1">
            <p className="text-sm text-slate-700">
              {review.review.length > 299
                ? review.review.substring(0, 300) + "..."
                : review.review}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewCard;
