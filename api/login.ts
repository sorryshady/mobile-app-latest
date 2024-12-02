interface FormData {
  membershipId: string;
  password: string;
  confirmPassword: string;
}
export const setPassword = async (formData: FormData) => {
  try {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/login/first-login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      },
    );
    const data = await response.json();
    if (data.error) {
      return {
        error: data.error,
      };
    } else {
      return {
        user: data.userObject,
        session: data.session,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

interface Login {
  membershipId: string;
  password: string;
}
export const loginUser = async (formData: Login) => {
  try {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/login/normal-login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      },
    );
    const data = await response.json();
    if (data.error) {
      return {
        error: data.error,
      };
    } else {
      return {
        user: data.userObject,
        session: data.session,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

export const submitIdentifier = async (identifier: string) => {
  try {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/auth/check-user`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier,
        }),
      },
    );
    const data = await response.json();
    if (data.error) {
      return {
        error: data.error,
      };
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const submitPassword = async (identifier: string, password: string) => {
  try {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier,
          password,
        }),
      },
    );
    const data = await response.json();
    if (data.error) {
      return {
        error: data.error,
      };
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};
