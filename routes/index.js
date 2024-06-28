let express=require("express");
let route=express.Router();
let{postData,loginData}=require("../controllers/sign_in_up")
let {student_Signup,login_std,findAllStd,verifyToken,delStd,editStd}=require("../controllers/student_signup_in")

route.get("/Allget",verifyToken ,findAllStd)
route.post("/post",postData);
route.post("/login",loginData);
route.post("/student_signup",verifyToken,student_Signup);
route.delete('/student/:id',verifyToken,delStd);
route.put('/student/:id',verifyToken,editStd);
route.post("/std_login",login_std)
module.exports={route}; 