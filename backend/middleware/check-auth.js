const jwt = require("jsonwebtoken");


//ONLY FOR VERIFICATION USING THE TOKEN WHETHER THE USER IS AITHENTICATED OR NOT
// THE PASSWORDS ARE FOR AUTHORIZATOION OF THE USER
module.exports = (req, res, next) => {
  try {
    // check for authentication in the backend
    const token = req.headers.authorization.split(" ")[1];
    // TO VERIFY THAT WE ARE THE ONLY USER FOR VEWRIFICATION OF THE JSONWEBTOKEN
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    // NOW IT WILL RETURN THE DATA RELATED TO THE WEB TOKEN AND MODIFY IT IN THE FORM OF THER TOKEN
    req.userData = { email: decodedToken.email, userId: decodedToken.userId };
    next();
  } catch (error) {

    // if the token does not exists then error is displayed
    //SNED THE ERROR OCCURED IN AUATHENTICATION
    res.status(401).json({ message: "You are not authenticated!" });
    // res.render(`alert("you are not authenticated ")`);
  }
};
