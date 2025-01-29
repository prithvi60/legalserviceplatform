import prisma from "@/prisma/db";
import {
  Context,
  CreateBusinessFormInput,
  DeleteBusinessFormInput,
  UpdateBusinessFormInput,
} from "@/types/Types";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.NEXTAUTH_SECRET;

if (!JWT_SECRET) {
  throw new Error("NEXTAUTH_SECRET is not defined in environment variables");
}

interface User {
  id: number;
  email: string;
}

interface UserSignUp {
  id: number;
  email: string;
  username: string;
  company_name: string;
  phone_number: string;
  address: string;
  password: string;
  confirmPassword: string;
}

const generateToken = (user: User) => {
  return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "5m",
  });
};

const comparePassword = async (
  enteredPassword: string,
  storedPassword: string
) => {
  const isMatch = await bcrypt.compare(enteredPassword, storedPassword);
  if (!isMatch) {
    throw new Error("Invalid password");
  }
};

export const resolvers = {
  Query: {
    user: async (_: unknown, __: unknown, { userId }: Context) => {
      if (!userId) {
        throw new Error("Unauthorized");
      }
      try {
        const user = await prisma.users.findUnique({
          where: { id: userId },
        });

        return user;
      } catch (error) {
        console.error("Error while fetching user:", error);
        throw new Error("Failed to fetch user");
      }
    },
    users: async () => {
      try {
        const users = await prisma.users.findMany();

        return users;
      } catch (error) {
        console.error("Error while fetching users:", error);
        throw new Error("Failed to fetch users");
      }
    },
    getUser: async (_: unknown, { email }: { email: string }) => {
      const emailId = prisma.users.findUnique({
        where: { email },
        include: {
          BusinessForms: true,
        },
      });

      return emailId;
    },
    getBusinessForms: async (_: unknown, { userId, DocNumber }: { userId: number; DocNumber: number }) => {
      try {
        return await prisma.businessForm.findMany({
          where: { userId, DocNumber },
        });
      } catch (error) {
        console.error("Error fetching business forms:", error);
        throw new Error("Failed to fetch business forms.");
      }
    },
    getBusinessForm: async (_: unknown, { userId, DocType, DocNumber }: { userId: number, DocType: string, DocNumber: number }) => {
      try {
        const form = await prisma.businessForm.findFirst({
          where: {
            userId,
            DocType,
            DocNumber,
          },
        });

        if (!form) {
          throw new Error("Business form not found.");
        }

        return form;
      } catch (error) {
        console.error("Error fetching business form:", error);
        throw new Error("Failed to fetch business form.");
      }
    },
  },
  Mutation: {
    signUp: async (
      _: unknown,
      {
        username,
        email,
        company_name,
        phone_number,
        address,
        password,
        confirmPassword,
      }: UserSignUp
    ) => {
      try {
        // Validate password match
        if (password !== confirmPassword) {
          throw new Error("Passwords do not match, please check the password");
        }

        // Check if the email already exists
        const existingUser = await prisma.users.findUnique({
          where: { email },
        });

        if (existingUser) {
          throw new Error("Email already in use. Please try another");
        }

        // Hash the password
        const hashedPwd = await bcrypt.hash(password, 10);

        // Create new user
        const userData = await prisma.users.create({
          data: {
            username,
            email,
            company_name,
            password: hashedPwd,
            phone_number,
            address,
          },
        });

        return userData;
      } catch (error: any) {
        // Log the actual error for debugging
        console.error("Error while creating user:", error.message);

        // Throw a more user-friendly message
        if (error.message.includes("Passwords do not match")) {
          throw new Error(error.message);
        } else if (error.message.includes("Email already exists")) {
          throw new Error(error.message);
        } else {
          throw new Error("Couldn’t create user. Please try again later");
        }
      }
    },
    login: async (
      _: unknown,
      { email, password }: { email: string; password: string }
    ) => {
      try {
        // Check in 'users' table (admin role)
        const user = await prisma.users.findUnique({ where: { email } });
        if (user) {
          // Compare the password
          await comparePassword(password, user.password);

          // Generate token and return user data
          const token = generateToken(user);
          return { ...user, token };
        }

        throw new Error("Invalid email or password");
      } catch (error: any) {
        console.error("Error logging in user:", error.message);
        throw new Error("Failed to log in");
      }
    },
    createBusinessForm: async (
      _: unknown,
      { input }: { input: CreateBusinessFormInput }
    ) => {
      const { userId, DocType, formData, status, url } = input;

      try {
        // Find the current max DocNumber for the given DocType and userId
        const maxDocNumber = await prisma.businessForm.aggregate({
          _max: {
            DocNumber: true,
          },
          where: {
            userId,
            DocType,
          },
        });

        // If no forms exist for the DocType, start from 1
        const newDocNumber = (maxDocNumber._max.DocNumber || 0) + 1;

        // Create the new business form
        const newForm = await prisma.businessForm.create({
          data: {
            userId,
            DocType,
            DocNumber: newDocNumber,
            formData,
            status,
            url,
          },
        });

        return newForm;
      } catch (error) {
        console.error("Error creating business form:", error);
        throw new Error("Failed to create business form");
      }
    },
    updateBusinessForm: async (
      _: unknown,
      { input }: { input: UpdateBusinessFormInput }
    ) => {
      try {
        const { userId, DocNumber, ...updates } = input;

        const updatedForm = await prisma.businessForm.updateMany({
          where: { userId, DocNumber },
          data: updates,
        });

        if (updatedForm.count === 0) {
          throw new Error("No matching business form found to update.");
        }

        return prisma.businessForm.findFirst({ where: { userId, DocNumber } });
      } catch (error) {
        console.error("Error updating business form:", error);
        if (error instanceof Error) {
          throw new Error(`Failed to update business form: ${error.message}`);
        } else {
          throw new Error("Failed to update business form");
        }
      }
    },
    deleteBusinessForm: async (
      _: unknown,
      { input }: { input: DeleteBusinessFormInput }
    ): Promise<boolean> => {
      try {
        const { userId, DocType, DocNumber } = input;
        console.log(input);

        // Check if the form exists
        const existingForm = await prisma.businessForm.findFirst({
          where: {
            userId,
            DocType,
            DocNumber,
          },
        });

        if (!existingForm) {
          console.error("No matching business form found to delete.");
          return false; // Return `false` if no form is found
        }

        // Delete the form
        const deletedForm = await prisma.businessForm.deleteMany({
          where: {
            userId,
            DocType,
            DocNumber,
          },
        });

        // Return true if at least one record was deleted, otherwise false
        return deletedForm.count > 0;
      } catch (error) {
        console.error("Error deleting business form:", error);
        return false; // Return `false` if there's an error
      }
    }
  },
};
