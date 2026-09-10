import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";
import { FaUser, FaUsers, FaCheck } from "react-icons/fa";
import { IoIosPricetags } from "react-icons/io";
import { FiMessageCircle, FiArrowLeft } from "react-icons/fi";

const ShowOnePg = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get PG object sent from UserMainPage
const pg = location.state?.pg;

  const [currentImage, setCurrentImage] = useState(0);

  // If user directly opens /pg/1 without state
  if (!pg) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-bold text-gray-800">
          PG details not found
        </h2>

        <button
          onClick={() => navigate(-1)}
          className="mt-4 rounded bg-violet-600 px-4 py-2 text-white"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-5 flex items-center gap-2 rounded-lg border bg-white px-4 py-2 font-semibold shadow-sm hover:bg-gray-100"
      >
        <FiArrowLeft />
        Back
      </button>

      <div className="mx-auto max-w-6xl rounded-xl bg-white p-6 shadow-lg">

        {/* PG Name */}
        <div className="mb-6 flex items-center justify-between">

          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {pg.pgName}
            </h1>

            <p className="mt-2 flex items-center gap-1 text-gray-600">
              <CiLocationOn className="text-red-500" />
              {pg.address}, {pg.city}
            </p>
          </div>

          <span
            className={`rounded-lg px-4 py-2 font-semibold ${
              pg.availability === "Available"
                ? "bg-green-100 text-green-700"
                : "bg-orange-100 text-orange-700"
            }`}
          >
            {pg.availability}
          </span>

        </div>

        {/* Images + Basic details */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">

          {/* Images */}
          <div>

            <div className="h-[400px] overflow-hidden rounded-xl">
              <img
                src={pg.images[currentImage]}
                alt={pg.pgName}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Thumbnail images */}
            <div className="mt-4 flex gap-3 overflow-x-auto">

              {pg.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${pg.pgName} ${index + 1}`}
                  onClick={() => setCurrentImage(index)}
                  className={`h-20 w-24 cursor-pointer rounded-lg object-cover ${
                    currentImage === index
                      ? "border-4 border-violet-600"
                      : "border border-gray-200"
                  }`}
                />
              ))}

            </div>

          </div>

          {/* Details */}
          <div>

            <h2 className="mb-5 text-2xl font-bold">
              PG Information
            </h2>

            <div className="space-y-5">

              <div className="flex items-center gap-3">
                <FaUsers className="text-violet-600" />
                <div>
                  <p className="text-sm text-gray-500">
                    Room Type
                  </p>

                  <p className="font-semibold">
                    {pg.roomType}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <IoIosPricetags className="text-violet-600" />

                <div>
                  <p className="text-sm text-gray-500">
                    Rent
                  </p>

                  <p className="font-semibold">
                    ₹{pg.rentPerMonth} / month
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <FaUser className="text-violet-600" />

                <div>
                  <p className="text-sm text-gray-500">
                    Owner
                  </p>

                  <p className="font-semibold">
                    {pg.onwername}
                  </p>
                </div>
              </div>

              <div>
                <p className="mb-2 text-sm text-gray-500">
                  Address
                </p>

                <p className="font-semibold">
                  {pg.address}, {pg.city}
                </p>
              </div>

            </div>

            {/* Message button */}
            <button
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-lg bg-violet-600 px-5 py-3 font-semibold text-white hover:bg-violet-700"
            >
              <FiMessageCircle />
              Message Owner
            </button>

          </div>

        </div>

        {/* Facilities */}
        <div className="mt-10 border-t pt-8">

          <h2 className="mb-5 text-2xl font-bold">
            Facilities
          </h2>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">

            {pg.facilities.map((facility, index) => (
              <div
                key={index}
                className="flex items-center gap-2 rounded-lg bg-violet-50 p-4"
              >
                <FaCheck className="text-green-600" />

                <span className="font-medium">
                  {facility}
                </span>
              </div>
            ))}

          </div>

        </div>

        {/* Description */}
        <div className="mt-10 border-t pt-8">

          <h2 className="mb-3 text-2xl font-bold">
            About this PG
          </h2>

          <p className="leading-7 text-gray-600">
            {pg.description}
          </p>

        </div>

        {/* Food */}
        <div className="mt-8">

          <h2 className="mb-3 text-xl font-bold">
            Food Information
          </h2>

          <p className="text-gray-600">
            {pg.foodIncluded
              ? pg.foodIncluded
              : "Food information not provided"}
          </p>

        </div>

      </div>
    </div>
  );
};

export default ShowOnePg;