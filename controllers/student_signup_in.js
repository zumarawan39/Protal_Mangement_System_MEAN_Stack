const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { savedata_student, std_snd_fnd,deletedStudent,updateStudent,std_login } = require("../modals/student_sign_up_in");

// token verification and decoding
function verifyToken(req, res, next) {
  const secret_key = "your-secret-key";
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
      const bearerToken = bearerHeader.split(" ")[1];
      jwt.verify(bearerToken, secret_key, (err, decodedToken) => {
          if (err) {
              console.error("JWT verification error:", err);
              return res.sendStatus(403);
          } else {
              req.email_teacher = decodedToken.email; 
              next();
          }
      });
  } else {
      res.sendStatus(403);
  }
}
//sign in the students
let student_Signup = async (req, res) => {
  try {
      let data = req.body;
      let email_teacher = req.email_teacher; 

      let user = await savedata_student(data, email_teacher);
      await std_snd_fnd(email_teacher);

      if (user) {
          // Sending email with user's credentials
          let transporter = nodemailer.createTransport({
              service: "gmail",
              auth: {
                  user: "zumarawan39@gmail.com",
                  pass: "hlpp ctms wmzr nmhn",
              },
          });

          let mailOptions = {
              from: "zumarawan39@gmail.com",
              to: user.email,
              subject: "Your University Email and password",
              text: `Your password: ${user.password}`,
          };

          transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                  console.error("Email sending error:", error);
              } else {
                  console.log("Email sent: " + info.response);
              }
          });

          return res.json({ user });
      } else {
          return res.status(500).json({ error: "Failed to save student data" });
      }
  } catch (error) {
      console.error("Error in student_Signup function:", error);
      res.status(500).json({ error: "Internal server error" });
  }
};
// Function to find all students
let findAllStd = async (req, res) => {
  try {
      let email_teacher = req.email_teacher; 
      let students = await std_snd_fnd(email_teacher);
      console.log("students check password",students);
      res.json(students);
  } catch (error) {
      console.error("Error in findAllStd function:", error);
      res.status(500).json({ error: "Internal server error" });
  }
};
//function of delete  
const delStd =async (req, res) => {
    try {
      const id = req.params.id;
      const deletedStudentData = await deletedStudent(id);
      console.log("deleted student===>",deletedStudentData);
  
      if (!deletedStudentData) {
        return res.status(404).json({ error: "Student not found" });
      }
  
      const email_teacher = req.email_teacher;
      const remainingStudents = await std_snd_fnd(email_teacher);
  
      res.json({
        message: "Student deleted successfully",
        students: remainingStudents,
      });
    } catch (error) {
      console.error("Error in delete student by id:", error);
      res.status(500).json({ error: "Internal server error" });
    }
};
// function of edit values put in form 
  const editStd = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    try {
      const updatedStudent = await updateStudent(id, updatedData);
      if (!updatedStudent) {
        return res.status(404).json({ error: "Student not found" });
      }
      const email_teacher = req.email_teacher;
      const remainingStudents = await std_snd_fnd(email_teacher);
      res.json({
        message: "Student updated successfully",
        students: remainingStudents,
      });
    } catch (error) {
      console.error("Error in updating student:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  // login work
let login_std=async(req,res)=>{
  let data=req.body;
  let check=await std_login(data);
  console.log(check);
  if (check == false) {
    res.send({ message: "Your passsword is not correct" });
  } else {
    res.json(check)
  };
};
module.exports = { student_Signup, findAllStd,verifyToken,delStd,editStd,login_std};
