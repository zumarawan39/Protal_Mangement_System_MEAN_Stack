let mongoose=require("mongoose");
let schema=mongoose.Schema({
    name:String,
    email:String,
    password:String,
    c_password:String,
})
let modal=mongoose.model("p_sign_in",schema);
let Url="mongodb+srv://seebizbpt0623evdev41:l2Be11O5zei97LtK@tasks.fkxsczr.mongodb.net/";

const savedata = async (data) => {
    await mongoose.connect(Url);
    const user = new modal({
      name: data.name,
      email: data.email,
      password:data.password,
      c_password:data.c_password
    });
    await user.save();
  };
  const teacher_login=async(data)=>{
  await mongoose.connect(Url);
  let result = await modal.findOne({ email: data.email, password: data.password }); 
  console.log(result);
  if (!result) {
    return false;
  } else {
    return result;
  }
  }
 module.exports={savedata,teacher_login};
