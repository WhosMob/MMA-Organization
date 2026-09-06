export function calculateAge(dateOfBirth: string): number {
  const [year, month, day] = dateOfBirth.split("-").map(Number);

  if (!year || !month || !day) return 0;

  const today = new Date();
  let age = today.getFullYear() - year;

  const birthdayNotYetPassed =
    today.getMonth() < month - 1 ||
    (today.getMonth() === month - 1 && today.getDate() < day);

  if (birthdayNotYetPassed) age -= 1;

  return age;
}