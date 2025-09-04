export const formattedDotDate = (createdAt: string) => {
  return new Date(createdAt)
    .toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\s/g, "");
};
