import mongoose from "mongoose";
import dotenv from "dotenv";
import pgModel from "./models/addpgModel.js";
import ownerModel from "./models/ownerLoginModel.js";

dotenv.config();

const seedPgData = async () => {
    try {
        // Connect MongoDB
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected");

        // Get owners from database
        const owners = await ownerModel.find();

        console.log("Owners found:", owners.length);

        if (owners.length === 0) {
            console.log("No owners found in database");
            process.exit();
        }

        // Delete old PG dummy data
        await pgModel.deleteMany({});

        const dummyPgData = [
            {
                ownerId: owners[0]._id,

                pgName: "Royal Residency PG",
                address: "Sector 15, Chandigarh",
                city: "Chandigarh",
                rentPerMonth: 8500,

                pgType: "Boys PG",

                roomType: "Single seater",

                availability: "Available",

                facilities: [
                    "AC",
                    "WiFi",
                    "Food",
                    "Laundry",
                    "Hot Water",
                    "Housekeeping",
                ],

                foodIncluded: true,

                description:
                    "A comfortable and well-maintained PG for students and working professionals. The PG provides furnished rooms, WiFi, food, laundry and housekeeping services.",

                images: [
                    {
                        public_id: "demo1",
                        url: "https://picsum.photos/800/600?random=1",
                    },
                    {
                        public_id: "demo2",
                        url: "https://picsum.photos/800/600?random=2",
                    },
                    {
                        public_id: "demo3",
                        url: "https://picsum.photos/800/600?random=3",
                    },
                    {
                        public_id: "demo4",
                        url: "https://picsum.photos/800/600?random=4",
                    },
                ],
            },

            {
                ownerId: owners[0]._id,

                pgName: "Green Valley Girls PG",
                address: "Sector 22, Chandigarh",
                city: "Chandigarh",
                rentPerMonth: 9500,

                pgType: "Girls PG",

                roomType: "Double seater",

                availability: "Available",

                facilities: [
                    "AC",
                    "WiFi",
                    "Food",
                    "Parking",
                    "Housekeeping",
                    "Hot Water",
                ],

                foodIncluded: true,

                description:
                    "Safe and peaceful girls PG located in Sector 22. Fully furnished rooms with food, WiFi, parking and housekeeping facilities.",

                images: [
                    {
                        public_id: "demo5",
                        url: "https://picsum.photos/800/600?random=5",
                    },
                    {
                        public_id: "demo6",
                        url: "https://picsum.photos/800/600?random=6",
                    },
                    {
                        public_id: "demo7",
                        url: "https://picsum.photos/800/600?random=7",
                    },
                    {
                        public_id: "demo8",
                        url: "https://picsum.photos/800/600?random=8",
                    },
                ],
            },

            {
                ownerId: owners[0]._id,
                pgName: "Urban Co Living",
                address: "Sector 34, Chandigarh",
                city: "Chandigarh",
                rentPerMonth: 7500,
                pgType: "Co-living",
                roomType: "Triple seater",
                availability: "Available",
                facilities: [
                    "Non-AC",
                    "WiFi",
                    "Parking",
                    "Laundry",
                    "Hot Water",
                ],

                foodIncluded: false,

                description:
                    "Affordable co-living PG suitable for students and young professionals. The property offers spacious rooms, high-speed WiFi, parking and laundry facilities.",

                images: [
                    {
                        public_id: "demo9",
                        url: "https://picsum.photos/800/600?random=9",
                    },
                    {
                        public_id: "demo10",
                        url: "https://picsum.photos/800/600?random=10",
                    },
                    {
                        public_id: "demo11",
                        url: "https://picsum.photos/800/600?random=11",
                    },
                    {
                        public_id: "demo12",
                        url: "https://picsum.photos/800/600?random=12",
                    },
                ],
            },

            {
                ownerId: owners[0]._id,

                pgName: "Comfort Stay PG",
                address: "Sector 43, Chandigarh",
                city: "Chandigarh",
                rentPerMonth: 11000,

                pgType: "Boys PG",

                roomType: "Double seater",

                availability: "Available",

                facilities: [
                    "AC",
                    "WiFi",
                    "Food",
                    "Parking",
                    "Laundry",
                    "Housekeeping",
                    "Hot Water",
                ],

                foodIncluded: true,

                description:
                    "Premium boys PG with fully furnished rooms and modern facilities. Located near major offices, colleges and public transport.",

                images: [
                    {
                        public_id: "demo13",
                        url: "https://picsum.photos/800/600?random=13",
                    },
                    {
                        public_id: "demo14",
                        url: "https://picsum.photos/800/600?random=14",
                    },
                    {
                        public_id: "demo15",
                        url: "https://picsum.photos/800/600?random=15",
                    },
                    {
                        public_id: "demo16",
                        url: "https://picsum.photos/800/600?random=16",
                    },
                ],
            },
                {
        ownerId: owners[0]._id,

        pgName: "Sunrise Boys Hostel",
        address: "Sector 18, Chandigarh",
        city: "Chandigarh",
        rentPerMonth: 7000,

        pgType: "Boys PG",
        roomType: "Triple seater",
        availability: "Available",

        facilities: [
            "Non-AC",
            "WiFi",
            "Food",
            "Laundry",
            "Hot Water",
        ],

        description:
            "Affordable boys PG near colleges and coaching institutes with comfortable rooms and daily food facilities.",

        images: [
            {
                public_id: "demo17",
                url: "https://picsum.photos/800/600?random=17",
            },
            {
                public_id: "demo18",
                url: "https://picsum.photos/800/600?random=18",
            },
            {
                public_id: "demo19",
                url: "https://picsum.photos/800/600?random=19",
            },
            {
                public_id: "demo20",
                url: "https://picsum.photos/800/600?random=20",
            },
        ],
    },

    // 6
    {
        ownerId: owners[0]._id,

        pgName: "Pearl Girls Residency",
        address: "Sector 35, Chandigarh",
        city: "Chandigarh",
        rentPerMonth: 10500,

        pgType: "Girls PG",
        roomType: "Single seater",
        availability: "Available",

        facilities: [
            "AC",
            "WiFi",
            "Food",
            "Parking",
            "Hot Water",
            "Housekeeping",
        ],

        description:
            "Premium girls PG offering private rooms, nutritious food, WiFi, parking and professional housekeeping.",

        images: [
            {
                public_id: "demo21",
                url: "https://picsum.photos/800/600?random=21",
            },
            {
                public_id: "demo22",
                url: "https://picsum.photos/800/600?random=22",
            },
            {
                public_id: "demo23",
                url: "https://picsum.photos/800/600?random=23",
            },
            {
                public_id: "demo24",
                url: "https://picsum.photos/800/600?random=24",
            },
        ],
    },

    // 7
    {
        ownerId: owners[0]._id,

        pgName: "Student Comfort Home",
        address: "Sector 20, Chandigarh",
        city: "Chandigarh",
        rentPerMonth: 6500,

        pgType: "Co-living",
        roomType: "Four seater",
        availability: "Available",

        facilities: [
            "Non-AC",
            "WiFi",
            "Food",
            "Laundry",
            "Hot Water",
        ],

        description:
            "Budget-friendly co-living accommodation ideal for students looking for affordable rooms with essential facilities.",

        images: [
            {
                public_id: "demo25",
                url: "https://picsum.photos/800/600?random=25",
            },
            {
                public_id: "demo26",
                url: "https://picsum.photos/800/600?random=26",
            },
            {
                public_id: "demo27",
                url: "https://picsum.photos/800/600?random=27",
            },
            {
                public_id: "demo28",
                url: "https://picsum.photos/800/600?random=28",
            },
        ],
    },

    // 8
    {
        ownerId: owners[0]._id,

        pgName: "Maple Leaf PG",
        address: "Sector 44, Chandigarh",
        city: "Chandigarh",
        rentPerMonth: 12000,

        pgType: "Girls PG",
        roomType: "Double seater",
        availability: "Available",

        facilities: [
            "AC",
            "WiFi",
            "Food",
            "Parking",
            "Laundry",
            "Housekeeping",
            "Hot Water",
        ],

        description:
            "Modern girls PG with spacious double rooms, air conditioning, food service, parking and housekeeping.",

        images: [
            {
                public_id: "demo29",
                url: "https://picsum.photos/800/600?random=29",
            },
            {
                public_id: "demo30",
                url: "https://picsum.photos/800/600?random=30",
            },
            {
                public_id: "demo31",
                url: "https://picsum.photos/800/600?random=31",
            },
            {
                public_id: "demo32",
                url: "https://picsum.photos/800/600?random=32",
            },
        ],
    },

    // 9
    {
        ownerId: owners[0]._id,

        pgName: "City View Co Living",
        address: "Sector 32, Chandigarh",
        city: "Chandigarh",
        rentPerMonth: 8000,

        pgType: "Co-living",
        roomType: "Four seater",
        availability: "Available",

        facilities: [
            "AC",
            "WiFi",
            "Parking",
            "Laundry",
            "Hot Water",
        ],

        description:
            "Modern co-living accommodation with comfortable rooms, high-speed WiFi, parking and laundry facilities.",

        images: [
            {
                public_id: "demo33",
                url: "https://picsum.photos/800/600?random=33",
            },
            {
                public_id: "demo34",
                url: "https://picsum.photos/800/600?random=34",
            },
            {
                public_id: "demo35",
                url: "https://picsum.photos/800/600?random=35",
            },
            {
                public_id: "demo36",
                url: "https://picsum.photos/800/600?random=36",
            },
        ],
    },

    // 10
    {
        ownerId: owners[0]._id,

        pgName: "Elite Living PG",
        address: "Sector 21, Chandigarh",
        city: "Chandigarh",
        rentPerMonth: 13000,

        pgType: "Boys PG",
        roomType: "Single seater",
        availability: "Available",

        facilities: [
            "AC",
            "WiFi",
            "Food",
            "Parking",
            "Laundry",
            "Housekeeping",
            "Hot Water",
        ],

        description:
            "Premium single-seater boys PG with modern interiors, food service, WiFi, parking and complete housekeeping.",

        images: [
            {
                public_id: "demo37",
                url: "https://picsum.photos/800/600?random=37",
            },
            {
                public_id: "demo38",
                url: "https://picsum.photos/800/600?random=38",
            },
            {
                public_id: "demo39",
                url: "https://picsum.photos/800/600?random=39",
            },
            {
                public_id: "demo40",
                url: "https://picsum.photos/800/600?random=40",
            },
        ],
    },

    // 11
    {
        ownerId: owners[0]._id,

        pgName: "Green Nest PG",
        address: "Sector 27, Chandigarh",
        city: "Chandigarh",
        rentPerMonth: 9000,

        pgType: "Girls PG",
        roomType: "Triple seater",
        availability: "Available",

        facilities: [
            "Non-AC",
            "WiFi",
            "Food",
            "Laundry",
            "Hot Water",
            "Housekeeping",
        ],

        description:
            "Comfortable girls PG with spacious three-seater rooms, food, WiFi, laundry and housekeeping facilities.",

        images: [
            {
                public_id: "demo41",
                url: "https://picsum.photos/800/600?random=41",
            },
            {
                public_id: "demo42",
                url: "https://picsum.photos/800/600?random=42",
            },
            {
                public_id: "demo43",
                url: "https://picsum.photos/800/600?random=43",
            },
            {
                public_id: "demo44",
                url: "https://picsum.photos/800/600?random=44",
            },
        ],
    },

    // 12
    {
        ownerId: owners[0]._id,

        pgName: "Urban Heights PG",
        address: "Sector 40, Chandigarh",
        city: "Chandigarh",
        rentPerMonth: 10000,

        pgType: "Co-living",
        roomType: "Double seater",
        availability: "Available",

        facilities: [
            "AC",
            "WiFi",
            "Parking",
            "Laundry",
            "Housekeeping",
            "Hot Water",
        ],

        description:
            "Well-maintained co-living PG with comfortable double rooms, air conditioning, WiFi, parking and laundry facilities.",

        images: [
            {
                public_id: "demo45",
                url: "https://picsum.photos/800/600?random=45",
            },
            {
                public_id: "demo46",
                url: "https://picsum.photos/800/600?random=46",
            },
            {
                public_id: "demo47",
                url: "https://picsum.photos/800/600?random=47",
            },
            {
                public_id: "demo48",
                url: "https://picsum.photos/800/600?random=48",
            },
        ],
    },
        ];

        // Insert data
        const result = await pgModel.insertMany(dummyPgData);

        console.log(`${result.length} PGs inserted successfully`);

        process.exit();
    } catch (error) {
        console.error("Error seeding PG data:", error);

        process.exit(1);
    }
};

seedPgData();