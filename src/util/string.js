export const getInitials = (firstName, lastName) => {
  const firstNameInitial = firstName[0];
  const lastNameInitial = lastName[0];
  return `${firstNameInitial}${lastNameInitial}`;
}
