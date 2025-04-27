import User from "../Models/userModels.js";
import bcrypt from "bcryptjs";
import generateJWTandCookie from "../Utils/generateJWT.js";

export const login =  (req, res) => {
try {
    const {username, password} = req.body;
    if(!username || !password){
        return res.status(400).json({error:"Please enter username and password"});
    }
    const user = await User.findOne({username});

    const isMatch = await bcrypt.compare(password, user?.password || "");
    if(!isMatch || !user){
        return res.status(400).json({error:"Invalid username or password"});
    }

    generateJWTandCookie(user._id, res);

    res.status(200).json({
        _id: user._id,
        name: user.name,
        username: user.username,
        profilePic: user.profilePic
    });
} catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({error: error.message});
}
    
};

export const signup = async (req, res) => {
    // input taken from frontend
    try {
        const {name, username, password, confirmPassword, gender} = req.body;
        if(password!=confirmPassword){
            return res.status(400).json({error:"Passwords do not match"});
        }

        if (await User.findOne({username})) {
            return res.status(400).json({error:"Username already exists"});
        }

        // create hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const malePic = `https://avatar.iran.liara.run/public/boy`;
        const femalePic = `https://avatar.iran.liara.run/public/girl`;
        const randomPic = `https://avatar.iran.liara.run/public`;

        const newUser = new User({
            name,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === "Male" ? malePic : gender === "Female" ? femalePic : randomPic
        })
        if(newUser){

            await generateJWTandCookie(newUser._id, res);

            // save to database
            await newUser.save();

            res.status(201).json({
                _id: newUser._id, // _id builtin by mongo
                name: newUser.name,
                username: newUser.username,

                profilePic: newUser.profilePic
            });

        }else{
            res.status(400).json({error:"User not created"});
        }
    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({error: error.message});
    }
};


export const logout = (req, res) => {
    res.send("Logout")
    console.log("Logout");
};
