import bcrypt from 'bcrypt';

function encryptData(password: string): string {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  return hashedPassword;
}

function checkPassword(password: string, hash: string): boolean {
  const isValid = bcrypt.compareSync(password, hash);

  return isValid;
}

export const bcryptUtils = {
  encryptData,
  checkPassword,
};
