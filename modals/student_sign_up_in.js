let mongoose = require("mongoose");
let schema = mongoose.Schema({
  name: String,
  email: String,
  password:String,
  email_teacher: String,
});
let modal = mongoose.model("students_data", schema);
let url="mongodb+srv://seebizbpt0623evdev41:l2Be11O5zei97LtK@tasks.fkxsczr.mongodb.net/";
let updateStudent=async(id, updatedData) =>{
  try {
    await mongoose.connect(url); // Connect to MongoDB
    let updatedStudent = await modal.findByIdAndUpdate(id, updatedData, { new: true });
    console.log("update data",updatedStudent);
    return updatedStudent;
  } catch (error) {
    console.error("Error updating student:", error);
    return null;
  }
};

const savedata_student = async (data,email_teacher) => {
  try {
    await mongoose.connect(url);
    const user = new modal({
      name: data.data.name,
      email: data.data.email,
      email_teacher: email_teacher,
      password: data.data.password,
    });
   let user1= await user.save();
    return user1;
  } catch (error) {
    return false;
  }
};
const std_snd_fnd = async (email_teacher) => {
  await mongoose.connect(url);
  let result = await modal.find({ email_teacher });
  return result;
};
const deletedStudent = async(id)=>{
  await mongoose.connect(url);
  let data=await modal.findByIdAndDelete(id);
  if (!data) {
    return res.status(404).json({ error: 'Student not found' });
  }
  return data;
}
const std_login=async(data)=>{
  await mongoose.connect(url);
  let result = await modal.findOne({ email: data.email, password: data.password }); 
  if (!result){
    return false;
  } else {
    return result;
  }
  }

module.exports = { savedata_student,std_login,std_snd_fnd,deletedStudent,updateStudent};
