import React, { useState } from "react";
import OnwerMainPage from "../../../ownerpage/OnwerMainPage";
import AddPgForm from "../../../ownerpage/AddPgForm";

const OwnerDashboard = () => {

    const [pgData, setPgData] = useState([]);

    const handlePgCreated = (data) => {
        console.log("Data received from AddPgForm:", data);

        setPgData((prev)=>[
            ...prev,data
        ]);
    };

    return (
        <div>
            <AddPgForm onPgCreated={handlePgCreated} />
            <OnwerMainPage pgDataInfo={pgData} />
        </div>
    );
};

export default OwnerDashboard;