import axios from "axios";

interface userRegistration {
  email: string;
  password: string;
  username: string;
}

export const handleRegistration = async ({
  email,
  password,
  username,
}: userRegistration) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/auth/registration",
      {
        email,
        password,
        username,
      }
    );
    const token = response.data.token;
    return token;
  } catch (error) {
    console.error("Registration failed", error);
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("An error occurred while registering");
    }
  }
};
