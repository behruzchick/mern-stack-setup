const enterNameError = (req,res) => {
    return res.status(403).json({
        message: "Please enter  name!"
    });
} 
const enterEmailError = (req,res) => {
    return res.status(403).json({
        message: "Please enter email!"
    });
} 
const enterPasswordError = (req,res) => {
    return res.status(403).json({
        message: "Please enter password!"
    });
} 
const passwordLengthError = (req,res) => {
    return res.status(403).json({
        message: "Password has been 8+ characters"
    });
}
const emailArleadyUsed = (req,res) => {
    return res.status(403).json({
        message: "Email arleady used!"
    })
}

const nameArleadyUsed = (req,res) => {
    return res.status(403).json({
        message: "Email arleady used!"
    })
}

const wrongPassword = (req,res) => {
    return res.status(403).json({
        message: "Wrong password"
    })
}
const confirmpassword = (req,res) => {
    return res.status(403).json({
        message: "Password not confirmed!"
    })
}   

module.exports = {
    enterEmailError,
    enterNameError,
    enterPasswordError,
    passwordLengthError,
    emailArleadyUsed,
    confirmpassword,
    nameArleadyUsed,
    wrongPassword
}