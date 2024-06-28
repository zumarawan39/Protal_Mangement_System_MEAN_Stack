let{savedata,teacher_login}=require("../modals/sign_up")
let jwt = require("jsonwebtoken");
let secretKey = "your-secret-key";
//sign_in work
let postData=async(req,res)=>{
let data=req.body;
let respose= await savedata(data);
return respose;
}
// login work
let loginData=async(req,res)=>{
  let data=req.body;
  let email=data.email;
  let check=await teacher_login(data);
  if (check == false) {
    res.send({ message: "Your passsword is not correct" });
  } else {
    jwt.sign({ email }, secretKey, { expiresIn: "1h" }, (err, token) => {
      if(err){
       res.json("error");
      }else{
      return res.status(200).json({ token: token});
      }
    });
  };
};
module.exports={postData,loginData}