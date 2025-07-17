import bcrypt from "bcrypt";

export const hashPassword = async(password) =>{
   try {
    const saltRound = 10;
    const hashedPass  = await bcrypt.hash(password,saltRound);
    return hashedPass;
   } catch (error) {
    console.log(error);
    
   }
}

export const comparePassword = async(password, hashedPassword) =>{
   try {
    const result =  await bcrypt.compare(password, hashedPassword);
    return result;
   } catch (error) {
    console.log(error)
    
   }
}