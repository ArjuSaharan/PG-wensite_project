import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { AppConetxt } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const EditPgData = () => {
    const {id}=useParams();
    const navigate=useNavigate();
    const {backendUrl}=useContext(AppConetxt);
    const [Loading,setLoading]=useState(true);
    const [saving,setsaving]=useState(false);
     const [formData, setFormData] = useState({

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

    });

    const fetchPg=async()=>{
        try{
            setLoading(true);
            const {data}=await axios.get(backendUrl+`/pg/owners/editdata/${id}`,{
            withCredentials:true
            })
            console.log(data);
            if(data.success){
                const pg=data.pg;
                setFormData({
                    pgName: pg.pgName || "",
                    address: pg.address || "",
                    city: pg.city || "",
                    rentPerMonth: pg.rentPerMonth || "",
                    pgType: pg.pgType || "",
                    roomType: pg.roomType || "",
                    availability: pg.availability || "",
                    facilities: pg.facilities || [],
                    description: pg.description || ""
                })

            }
            else{
                toast.error(data.message);
            }
        }
        catch(error){
             console.log("FETCH EDIT PG ERROR:", error);

            toast.error(
                error.response?.data?.message ||
                "Failed to fetch PG details"
            );
        }
        finally{
            setLoading(false);
        }
        
    }
    useEffect(()=>{
        fetchPg();
    },[id]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFacilityChange = (facility) => {
        setFormData((prev) => {
            const alreadySelected =
                prev.facilities.includes(facility);
            if (alreadySelected) {
                return {
                    ...prev,
                    facilities: prev.facilities.filter(
                        (item) => item !== facility
                    )
                };
            } else {
                return {
                    ...prev,
                    facilities: [
                        ...prev.facilities,
                        facility
                    ]
                }
            }
        });
    };

    const handleSubmit=async(e)=>{
        e.preventDefault();
        if (formData.facilities.length === 0) {
            toast.error("Please select at least one facility");
            return;
        }
        try{
            setsaving(true);
            const {data}=await axios.put(backendUrl+`/pg/owners/editdata/${id}`,formData,{
                withCredentials:true
            })
            console.log("update ",data);
            if(data.success){
                  toast.success(data.message);
                navigate("/ownerDashbord");
            }
            else{
                toast.error(data.message);
            }
        }
        catch(error){
              console.log("UPDATE PG ERROR:", error);
            toast.error(
                error.response?.data?.message ||
                "Failed to update PG"
            );
        }
        finally{
            setsaving(false);
        }
    }
     if (Loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">

                <p className="text-lg font-semibold">
                    Loading PG details...
                </p>

            </div>
        );
    }
  return (
    <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">
                    Edit PG
                </h1>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5"
                >


                    {/* PG NAME */}

                    <div>

                        <label className="block font-semibold mb-2">
                            PG Name
                        </label>

                        <input
                            type="text"
                            name="pgName"
                            value={formData.pgName}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-3"
                            required
                        />

                    </div>


                    {/* ADDRESS */}

                    <div>

                        <label className="block font-semibold mb-2">
                            Address
                        </label>

                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-3"
                            required
                        />

                    </div>


                    {/* CITY */}

                    <div>

                        <label className="block font-semibold mb-2">
                            City
                        </label>
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-3"
                            required
                        />

                    </div>


                    {/* RENT */}

                    <div>
                        <label className="block font-semibold mb-2">
                            Rent Per Month
                        </label>

                        <input
                            type="number"
                            name="rentPerMonth"
                            value={formData.rentPerMonth}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-3"
                            min="0"
                            required
                        />

                    </div>
                    {/* PG TYPE */}
                    <div>
                        <label className="block font-semibold mb-2">
                            PG Type
                        </label>
                        <div className="flex gap-5">

                            {[
                                "Boys PG",
                                "Girls PG",
                                "Co-living"
                            ].map((type) => (

                                <label
                                    key={type}
                                    className="flex gap-2"
                                >

                                    <input
                                        type="radio"
                                        name="pgType"
                                        value={type}
                                        checked={
                                            formData.pgType === type
                                        }
                                        onChange={handleChange}
                                    />
                                    {type}
                                </label>
                            ))}
                        </div>
                    </div>
                    {/* ROOM TYPE */}
                    <div>

                        <label className="block font-semibold mb-2">
                            Room Type
                        </label>

                        <div className="flex gap-5 flex-wrap">

                            {[
                                "Single seater",
                                "Double seater",
                                "Triple seater",
                                "Four seater"
                            ].map((type) => (

                                <label
                                    key={type}
                                    className="flex gap-2"
                                >
                                    <input
                                        type="radio"
                                        name="roomType"
                                        value={type}
                                        checked={
                                            formData.roomType === type
                                        }
                                        onChange={handleChange}
                                    />
                                    {type}
                                </label>
                            ))}
                        </div>
                    </div>
                    {/* AVAILABILITY */}
                    <div>
                        <label className="block font-semibold mb-2">
                            Availability
                        </label>
                        <div className="flex gap-5">
                            {[
                                "Available",
                                "Not Available"
                            ].map((status) => (
                                <label
                                    key={status}
                                    className="flex gap-2"
                                >
                                    <input
                                        type="radio"
                                        name="availability"
                                        value={status}
                                        checked={
                                            formData.availability === status
                                        }
                                        onChange={handleChange}
                                    />
                                    {status}
                                </label>
                            ))}
                        </div>
                    </div>
                    {/* FACILITIES */}
                    <div>
                        <label className="block font-semibold mb-2">
                            Facilities
                        </label>

                        <div className="grid grid-cols-2 gap-3">

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
                                    className="flex gap-2"
                                >
                                    <input
                                        type="checkbox"
                                        checked={formData.facilities.includes(
                                            facility
                                        )}
                                        onChange={() =>
                                            handleFacilityChange(
                                                facility
                                            )
                                        }
                                    />

                                    {facility}

                                </label>

                            ))}

                        </div>
                    </div>
                    {/* DESCRIPTION */}
                    <div>
                        <label className="block font-semibold mb-2">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="5"
                            className="w-full border rounded-lg p-3"
                            placeholder="Describe your PG..."
                        />
                    </div>
                    {/* BUTTONS */}
                    <div className="flex gap-4 mt-4">
                        <button
                            type="button"
                            onClick={() => navigate("/ownerDashbord")}
                            className="border border-gray-300 rounded-lg px-6 py-3 font-semibold"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={saving}
                            className="bg-violet-600 text-white rounded-lg px-6 py-3 font-semibold"
                        >
                            {saving
                                ? "Saving..."
                                : "Save Changes"}

                        </button>
                    </div>
                </form>
            </div>
        </div>
  )
}

export default EditPgData