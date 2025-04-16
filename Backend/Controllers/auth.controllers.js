export const login = (req, res) => {
    res.send("Login")
    console.log("Login");
};

export const signup = async (req, res) => {
    // input taken from frontend
    try {
        const {name, username, password, confirmPassword, gender} = req.body;
        
    } catch (error) {
        
    }
};


export const logout = (req, res) => {
    res.send("Logout")
    console.log("Logout");
};
