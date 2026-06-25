export const getPasswordStrength = (password: string) => {
  let score = 0;

  if (password.length >= 6) score += 25;
  if (/[A-Z]/.test(password)) score += 25;
  if (/[0-9]/.test(password)) score += 25;
  if (/[^A-Za-z0-9]/.test(password)) score += 25;

  return score;
};
