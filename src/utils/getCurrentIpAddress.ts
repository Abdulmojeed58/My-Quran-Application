export const getCurrentIp = async () => {
  try {
    const res = await fetch("https://api.ipify.org?format=json");

    if (!res.ok) {
      throw new Error("An Error occured");
    }
    const data = await res.json();
    return data.ip;
  } catch (error) {
    console.log("Error", error);
  }
};
