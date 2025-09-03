const revaildateTags = async (tags: string[]) => {
  try {
    await fetch(`/api/revalidate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tags }),
    });
  } catch (error) {
    console.error("Revalidation error:", error);
  }
};
export default revaildateTags;
