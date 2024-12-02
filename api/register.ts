interface FormData {
  name: string;
  email: string;
}

export const registerUser = async (formData: FormData) => {
  try {
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    // const response = await fetch('https://dummyjson.com/users/1')
    const data = await response.json();
    if (data.error) {
      return data;
    }
    const user = {
      name: data.user.name,
      email: data.user.email,
      membershipId: data.user.membershipId,
    };
    return user;
  } catch (error: any) {
    console.error(
      "Error registering user:",
      error.response?.data || error.message
    );
    throw new Error(error.response?.data?.message || "Failed to register user");
  }
};
