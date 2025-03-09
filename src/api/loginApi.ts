import axios from "axios";

interface userLogin {
  email: string;
  password: string;
}

export const handleLogin = async ({ email, password }: userLogin) => {
  try {
    const response = await axios.post("http://localhost:5000/auth/login", {
      email,
      password,
    });
    const token = response.data.token;
    return token;
  } catch (error) {
    console.error("Login failed", error);
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Произошла ошибка при логине");
    }
  }
};
