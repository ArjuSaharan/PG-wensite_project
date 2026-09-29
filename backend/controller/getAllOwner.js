 export const getAllOwners = async (req, res) => {
    try {
        const owners = await ownerLoginModel.find(
            {},
            {
                name: 1,
                email: 1,
                phone: 1
            }
        );
        return res.status(200).json({
            success: true,
            owners
        });

    } catch (error) {
        console.log("GET ALL OWNERS ERROR:", error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}