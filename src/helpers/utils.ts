export function getInitials(name: string) {
  const parts = name.split(" ");

  if (parts.length > 2) {
    return parts[0].charAt(0) + parts[parts.length - 1].charAt(0);
  }

  return parts.map((part) => part.charAt(0)).join("");
}
