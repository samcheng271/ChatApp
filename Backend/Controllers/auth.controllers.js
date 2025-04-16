import User from "../Models/userModels.js";

export const login = (req, res) => {
    res.send("Login")
    console.log("Login");
};

export const signup = async (req, res) => {
    // input taken from frontend
    try {
        const {name, username, password, confirmPassword, gender} = req.body;
        if(password!=confirmPassword){
            return res.status(400).json({error:"Passwords do not match"});
        }

        const existingUser = await User.findOne({username});
        if (existingUser) {
            return res.status(400).json({error:"Username already exists"});
        }

        const malePic = `https://avatar.iran.liara.run/public/boy`;
        const femalePic = `https://avatar.iran.liara.run/public/girl`;
        const otherPic = `https://avatar.iran.liara.run/public`;

        const newUser = new User({
            name,
            username,
            password,
            gender,
            profilePic: gender == "Male" ? malePic : gender == "Female" ? femalePic : otherPic
        })

        // save to database
        await newUser.save();

        res.status(201).json({
            _id: newUser._id, // _id builtin by mongo
            name: newUser.name,
            username: newUser.username,

            profilePic: newUser.profilePic
        });

    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({error: error.message});
    }
};


export const logout = (req, res) => {
    res.send("Logout")
    console.log("Logout");
};
