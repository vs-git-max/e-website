import bcrypt from "bcryptjs";

export const hashingPassword = async (password, salt = 12) => {
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (newPassword, userPassword) => {
  return await bcrypt.compare(newPassword, userPassword);
};
