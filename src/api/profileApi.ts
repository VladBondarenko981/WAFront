import axios from "axios";

interface UsernameProps {
  oldUsername: string;
  newUsername: string;
}

interface EmailProps {
  oldEmail: string;
  newEmail: string;
}

interface PasswordProps {
  email: string;
  password: string;
  newPassword: string;
}

export const changeUsername = async ({
  oldUsername,
  newUsername,
}: UsernameProps) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/users/changeUsername",
      {
        oldUsername,
        newUsername,
      }
    );
  } catch (error) {
    console.error("Failed to login", error);
    throw error;
  }
};

export const changeEmail = async ({ oldEmail, newEmail }: EmailProps) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/users/changeEmail",
      {
        oldEmail,
        newEmail,
      }
    );
  } catch (error) {
    console.error("Failed to login", error);
    throw error;
  }
};

export const changePassword = async ({
  password,
  newPassword,
  email,
}: PasswordProps) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/auth/changePassword",
      {
        email,
        password,
        newPassword,
      }
    );
  } catch (error) {
    console.error("Failed to login", error);
    throw error;
  }
};
