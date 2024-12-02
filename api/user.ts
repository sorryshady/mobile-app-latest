import { getToken } from "@/lib/handle-session-tokens";

export const getCurrentUser = async () => {
  try {
    const token = await getToken({ key: "session" });
    if (!token) {
      return null;
    }
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/auth/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (data?.error) {
      console.log(data.error);
    } else {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getCompleteUser = async () => {
  try {
    const token = await getToken({ key: "session" });
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/mobile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (data?.error) {
      console.log(data.error);
    } else {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
