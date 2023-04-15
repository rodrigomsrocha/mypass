export function calculatePasswordStrength(password: string) {
  let strength = 0;
  let regex = /[$-/:-?{-~!"^_`\[\]]/g; // Check for special characters
  let lowerLetters = /[a-z]+/.test(password); // Check for lowercase letters
  let upperLetters = /[A-Z]+/.test(password); // Check for uppercase letters
  let numbers = /[0-9]+/.test(password); // Check for numbers

  // Calculate password strength based on various factors
  if (password.length >= 8) {
    strength += 1;
  }

  if (lowerLetters && upperLetters) {
    strength += 1;
  }

  if (numbers) {
    strength += 1;
  }

  if (regex.test(password)) {
    strength += 1;
  }

  // Calculate strength percentage
  const strengthPercentage = (strength / 4) * 100;

  return strengthPercentage;
}
