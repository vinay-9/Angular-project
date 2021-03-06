const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
//exports karne hai in dono functions ko
exports.createUser = (req, res, next) => {
// to create a hash password
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash
    });

   // to save in the mongodb database
    user
    .save()//it will save the contents of the user
      .then((result) => {
        res.status(201).json({
          message: "User created!",
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          message: "Invalid authentication credentials!"
        });
      });
  });
}

exports.userLogin = (req, res, next) => {
  let fetchedUser;

  //search in rhte backend forlde of mongodb
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);// return true oor false to the then function
    })//dono me check karna hai ki kadhi hamara authentication kahi fail toh nahi hua hai
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
         process.env.JWT_KEY,
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id
      });
    })
    .then(result=>{
      if (!result) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }


















      const email_id = req.body.email;

      // Generate test SMTP service account from ethereal.email
      // Only needed if you don't have a real mail account for testing
      let testAccount =  nodemailer.createTestAccount();

      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({

      //trzwnpetkcrtzwer
        //host: "smtp.gmail",
        port: 587,
        service: 'Gmail',
        auth: {
        user: 'vinaychopra92.vc@gmail.com',
        pass: 'trzwnpetkcrtzwer'
      },
        secure: false, // true for 465, false for other ports
        //auth: {
          //user: testAccount.user, // generated ethereal user
          //pass: testAccount.pass // generated ethereal password
        //}
      });

      // send mail with defined transport object
      let info =  transporter.sendMail({
        from: '"vinay  chopra " <vinaychopra92.vc@gmail.com>', // sender address
        to: email_id, // list of receivers
        subject: "Hello", // Subject line
        text: "this is an autogenerated mail please do not reply , now you are signed up to our website ", // plain text body
        html: "<b>what are you doing rght now </b>" // html body
      });

      console.log("Message sent: %s ", info.messageId);
      console.log("message content is %s",info.text);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        })
        sendMail().catch(err => {
      return res.status(401).json({
        message: "Invalid authentication credentials!"
      });
    });
}
