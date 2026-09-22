import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppConetxt } from "../context/AppContext";
import { FaPhone, FaPhoneAlt, FaUser } from "react-icons/fa";
import { TbRecordMail } from "react-icons/tb";
import { MdEmail } from "react-icons/md";

const OwnerProfile = () => {

    const {
        backendUrl,
        owner,
        ownerdata,
        getownerdata
    } = useContext(AppConetxt);

    const [pgs, setPgs] = useState([]);
    const [loading, setLoading] = useState(true);

    const getMyPgs = async () => {
        try {

            const { data } = await axios.get(
                `${backendUrl}/pg/owners/my-pgs`,
                {
                    withCredentials: true
                }
            );

            if (data.success) {
                setPgs(data.pgs);
            }

        } catch (error) {

            console.log(
                error.response?.data || error.message
            );

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getownerdata();
        getMyPgs();
    }, []);

    const name =
        ownerdata?.name ||
        owner?.name ||
        ownerdata?.fullName ||
        owner?.fullName ||
        "Owner";

    const email =
        ownerdata?.email ||
        owner?.email ||
        "Email not available";

    const phone =
        ownerdata?.phone ||
        owner?.phone ||
        "Phone not available";

    const firstLetter = name.charAt(0).toUpperCase();

    return (

        <div className="min-h-screen bg-gray-100">

            {/* TOP HEADER */}

            <div className="h-[82px] bg-white flex items-center justify-between px-8 shadow">

                <h1 className="text-2xl font-bold">
                    My Profile
                </h1>

            </div>
            <div className="p-8">
                <div className="bg-white rounded-2xl shadow-sm p-8">
                    <div className="flex items-center gap-7">
                        <div className="w-28 h-28 rounded-full bg-violet-500 text-white flex items-center justify-center text-4xl font-bold">
                            {firstLetter || <FaUser />}
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">
                                {name}
                            </h2>
                            <p className="text-gray-600 mt-2 flex gap-1 ">
                               <MdEmail className="size-6"/> {email}
                            </p>

                            <p className="text-gray-600 mt-1 flex gap-1">
                               <FaPhoneAlt  className="size-5"/> {phone}
                            </p>

                        </div>

                    </div>


                    {/* TOTAL PG */}

                    <div className="mt-8 pt-6 border-t">

                        <p className="text-gray-500">
                            Total PG Listed
                        </p>

                        <h2 className="text-3xl font-bold text-violet-600 mt-1">
                            {pgs.length}
                        </h2>

                    </div>

                </div>


                {/* PG TABLE */}

                <div className="bg-white rounded-2xl shadow-sm mt-7 p-7">

                    <div className="flex justify-between items-center mb-5">

                        <h2 className="text-xl font-bold">
                            My PG Listings
                        </h2>

                        <span className="bg-violet-100 text-violet-700 px-4 py-2 rounded-full">
                            {pgs.length} PG
                            {pgs.length !== 1 ? "s" : ""}
                        </span>

                    </div>


                    {loading ? (

                        <p className="text-center py-8">
                            Loading...
                        </p>

                    ) : pgs.length === 0 ? (

                        <p className="text-center py-8 text-gray-500">
                            No PG listed yet.
                        </p>

                    ) : (

                        <div className="overflow-x-auto">

                            <table className="w-full">

                                <thead>

                                    <tr className="border-b">

                                        <th className="text-left py-4 px-4">
                                            #
                                        </th>

                                        <th className="text-left py-4 px-4">
                                            PG Name
                                        </th>

                                        <th className="text-left py-4 px-4">
                                            PG Type
                                        </th>

                                        <th className="text-left py-4 px-4">
                                            Room Type
                                        </th>

                                        <th className="text-left py-4 px-4">
                                            Price
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {pgs.map((pg, index) => (

                                        <tr
                                            key={pg._id}
                                            className="border-b hover:bg-gray-50"
                                        >

                                            <td className="py-4 px-4">
                                                {index + 1}
                                            </td>

                                            <td className="py-4 px-4 font-semibold">
                                                {pg.pgName}
                                            </td>

                                            <td className="py-4 px-4">
                                                {pg.pgType}
                                            </td>

                                            <td className="py-4 px-4">
                                                {pg.roomType}
                                            </td>

                                            <td className="py-4 px-4 font-semibold text-violet-600">
                                                ₹{pg.rentPerMonth}/month
                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    )}

                </div>

            </div>

        </div>
    );
};

export default OwnerProfile;