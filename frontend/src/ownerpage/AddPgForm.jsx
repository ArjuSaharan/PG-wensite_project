import React, { useContext, useState } from "react";
import { MdLocationOn } from "react-icons/md";
import { FaRupeeSign, FaImage } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AppConetxt } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
const AddPgForm = ({ onPgCreated }) => {

    const [formData, setFormData] = useState({
        pgName: "",
        address: "",
        city: "",
        rentPerMonth: "",
        pgType: "",
        roomType: "",
        availability: "",
        facilities: [],
        description: "",
    });
    const navigate = useNavigate();
    const { backendUrl } = useContext(AppConetxt);
    const [images, setImages] = useState([]);

    // Handle input, textarea and radio buttons
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };


    // Handle facilities checkbox
    const handleFacilityChange = (e) => {
        const { value, checked } = e.target;
        setFormData((prev) => {
            if (checked) {
                return {
                    ...prev,
                    facilities: [...prev.facilities, value]
                };
            } else {
                return {
                    ...prev,
                    facilities: prev.facilities.filter(
                        (facility) => facility !== value
                    )
                };
            }
        });
    };


    // Handle image upload
    const handleImageChange = (e) => {

        const selectedFiles = Array.from(e.target.files);

        // Maximum 6 images
        if (selectedFiles.length > 6) {
            alert("You can upload maximum 6 images");
            return;
        }

        setImages(selectedFiles);
    };
    const handleNaviaget = () => {
        navigate('/ownerDashbord')
    }

    // Remove image
    const removeImage = (indexToRemove) => {

        setImages((prevImages) =>
            prevImages.filter(
                (_, index) => index !== indexToRemove
            )
        );
    };


    // Submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (images.length < 4) {
            alert("Please upload at least 4 images");
            return;
        }
        if (images.length > 6) {
            alert("You can upload maximum 6 images");
            return;
        }
        if (formData.facilities.length === 0) {
            alert("Please select at least one facility");
            return;
        }

        try {
            const data = new FormData();
            data.append("pgName", formData.pgName);
            data.append("address", formData.address);
            data.append("city", formData.city);
            data.append("rentPerMonth", formData.rentPerMonth);
            data.append("pgType", formData.pgType);
            data.append("roomType", formData.roomType);
            data.append("availability", formData.availability);
            data.append("description", formData.description);

            formData.facilities.forEach((facility) => {
                data.append("facilities", facility);
            })
            images.forEach((image) => {
                data.append("images", image);
            })

            console.log("sending pg to backend");
            const response = await axios.post(backendUrl + '/pg/owners/addpg', data, {
                withCredentials: true,
            })
            console.log("data", response.data);
            if (response.data.success) {
                toast.success("PG Listing created successfully");
                if (onPgCreated) {
                    onPgCreated(response.data.pg);
                }
                setFormData({
                    pgName: "",
                    address: "",
                    city: "",
                    rentPerMonth: "",
                    pgType: "",
                    roomType: "",
                    availability: "",
                    facilities: [],
                    foodIncluded: "",
                    description: ""
                })
                setImages([]);
                navigate("/ownerDashbord");
            }
            else{
                toast.error(response.data.message);
            }
        }
        catch (error) {
            console.log(error);
            toast.error(
                 error.response?.data?.message ||
            "Failed to create PG"
            )
        }
    };
    return (

        <div className="min-h-screen bg-gray-50 py-8 px-4">

            <div className="max-w-5xl mx-auto">

                {/* Header */}

                <div className="bg-white rounded-xl shadow-sm p-6 mb-6">

                    <h1 className="text-3xl font-bold text-gray-900">
                        List Your PG
                    </h1>

                    <p className="text-gray-600 mt-2">
                        Add details about your PG to attract tenants.
                    </p>
                </div>
                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white rounded-xl shadow-sm p-6 space-y-8"
                >
                    {/* ================= BASIC DETAILS ================= */}
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-5">
                            Basic Information
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {/* PG NAME */}
                            <div className="md:col-span-2">

                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    PG Name
                                </label>
                                <input
                                    type="text"
                                    name="pgName"
                                    value={formData.pgName}
                                    onChange={handleChange}
                                    placeholder="Enter PG name"
                                    required
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-violet-500"
                                />
                            </div>
                            {/* ADDRESS */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Full Address
                                </label>
                                <div className="relative">

                                    <MdLocationOn className="absolute left-3 top-3.5 text-gray-500 text-xl" />

                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        placeholder="Enter complete address"
                                        required
                                        className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-violet-500"
                                    />
                                </div>
                            </div>
                            {/* CITY */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    City
                                </label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    placeholder="e.g. Indore"
                                    required
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-violet-500"
                                />
                            </div>
                            {/* RENT */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Rent Per Month
                                </label>
                                <div className="relative">
                                    <FaRupeeSign className="absolute left-3 top-3.5 text-gray-500" />

                                    <input
                                        type="number"
                                        name="rentPerMonth"
                                        value={formData.rentPerMonth}
                                        onChange={handleChange}
                                        placeholder="5000"
                                        min="0"
                                        required
                                        className="w-full border border-gray-300 rounded-lg pl-9 pr-4 py-3 outline-none focus:ring-2 focus:ring-violet-500"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* pg type */}
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-4">
                            PG Type
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {["Boys PG","Girls PG","Co-living"].map((type) => (
                                <label
                                    key={type}
                                    className={`border rounded-lg p-4 cursor-pointer flex items-center gap-3
                                    ${formData.pgType === type
                                            ? "border-violet-600 bg-violet-50"
                                            : "border-gray-300"
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        name="pgType"
                                        value={type}
                                        checked={formData.pgType === type}
                                        onChange={handleChange}
                                        required
                                        className="accent-violet-600"
                                    />
                                    <span className="font-medium">
                                        {type}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>
                    {/* ================= ROOM TYPE ================= */}
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-4">
                            Room Type
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {["Single seater", "Double seater", "Triple seater", "Four seater"].map((type) => (
                                <label
                                    key={type}
                                    className={`border rounded-lg p-4 cursor-pointer flex items-center gap-3
                                    ${formData.roomType === type
                                            ? "border-violet-600 bg-violet-50"
                                            : "border-gray-300"
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        name="roomType"
                                        value={type}
                                        checked={formData.roomType === type}
                                        onChange={handleChange}
                                        required
                                        className="accent-violet-600"
                                    />
                                    <span className="font-medium">
                                        {type} Room
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>
                    {/* ================= AVAILABILITY ================= */}
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-4">
                            Availability Status
                        </h2>
                        <div className="flex flex-wrap gap-4">
                            {["Available", "Not Available"].map(
                                (status) => (

                                    <label
                                        key={status}
                                        className={`border rounded-lg px-5 py-3 cursor-pointer flex items-center gap-3
                                        ${formData.availability === status
                                                ? "border-violet-600 bg-violet-50"
                                                : "border-gray-300"
                                            }`}
                                    >

                                        <input
                                            type="radio"
                                            name="availability"
                                            value={status}
                                            checked={
                                                formData.availability === status
                                            }
                                            onChange={handleChange}
                                            required
                                            className="accent-violet-600"
                                        />
                                        <span>
                                            {status}
                                        </span>
                                    </label>
                                )
                            )}
                        </div>
                    </div>
                    {/* ================= FACILITIES ================= */}
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-4">
                            Facilities
                        </h2>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                            {[
                                "AC",
                                "Non-AC",
                                "WiFi",
                                "Food",
                                "Parking",
                                "Laundry",
                                "Housekeeping",
                                "Hot Water"
                            ].map((facility) => (

                                <label
                                    key={facility}
                                    className={`border rounded-lg p-3 cursor-pointer flex items-center gap-3
                                    ${formData.facilities.includes(facility)
                                            ? "border-violet-600 bg-violet-50"
                                            : "border-gray-300"
                                        }`}
                                >
                                    <input
                                        type="checkbox"
                                        value={facility}
                                        checked={formData.facilities.includes(
                                            facility
                                        )}
                                        onChange={handleFacilityChange}
                                        className="accent-violet-600"
                                    />
                                    <span className="text-sm">
                                        {facility}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div>

                        <h2 className="text-xl font-bold text-gray-900 mb-4">
                            PG Description
                        </h2>

                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="6"
                            maxLength="1000"
                            required
                            placeholder="Describe your PG, nearby locations, environment, rules, facilities, etc."
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 resize-none outline-none focus:ring-2 focus:ring-violet-500"
                        />

                        <p className="text-sm text-gray-500 mt-1">
                            {formData.description.length}/1000 characters
                        </p>

                    </div>
                    {/* ================= IMAGES ================= */}

                    <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">
                            PG Images
                        </h2>
                        <p className="text-sm text-gray-600 mb-4">
                            Upload 4 to 6 images of your PG.
                        </p>
                        {/* Upload box */}
                        <label
                            htmlFor="pgImages"
                            className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-violet-500 hover:bg-violet-50 transition"
                        >
                            <FaImage className="text-4xl text-violet-600 mb-3" />

                            <p className="font-semibold text-gray-700">
                                Click to upload PG images
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                                Minimum 4 and maximum 6 images
                            </p>
                            <input
                                id="pgImages"
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </label>
                        {/* Image Preview */}

                        {images.length > 0 && (

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-5">

                                {images.map((image, index) => (

                                    <div
                                        key={index}
                                        className="relative group"
                                    >
                                        <img
                                            src={URL.createObjectURL(image)}
                                            alt={`PG ${index + 1}`}
                                            className="h-30 object-cover rounded-lg"
                                        />
                                        {/* Remove button */}
                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeImage(index)
                                            }
                                            className="absolute top-2 left-2 bg-red-600 text-white w-8 h-8 rounded-full opacity-0 group-hover:opacity-100 transition"
                                        >
                                            ×
                                        </button>

                                        <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                                            Image {index + 1}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                    </div>

                    {/* ================= SUBMIT ================= */}
                    <div className="border-t pt-6 flex justify-end">

                        <button

                            //   onClick={[handleChange,handleNaviaget]}
                            type="submit"
                            className="bg-violet-700 hover:bg-violet-800 text-white font-bold px-8 py-3 rounded-lg transition"
                        >
                            Create PG Listing
                        </button>
                    </div>
                </form>

            </div>

        </div>
    );
};

export default AddPgForm;