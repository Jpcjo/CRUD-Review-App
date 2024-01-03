const getInitials = (username) => {
  if (!username) {
    return "";
  }

  // Split the username into words
  const words = username.split(" ");

  // Extract the first letter of each word
  const initials = words.map((word) => word.charAt(0));

  // Join the initials and convert to uppercase
  return initials.join("").toUpperCase();
};

export { getInitials };
