export const getCurrentIp = async () => {
  try {
    const res = await fetch("https://api.ipify.org?format=json");

    if (!res.ok) {
      throw new Error("An Error occured");
    }
    const data = await res.json();
    console.log(data.ip)
    return data.ip;
  } catch (error) {
    console.log("Error", error);
  }
};
