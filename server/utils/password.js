import bcrypt from "bcryptjs";

export const hashPassword = async (password, salt = 12) => {
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (currentPassword, newPassword) => {
  return bcrypt.compare(currentPassword, newPassword);
};
