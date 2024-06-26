import { Client, Account, Databases, Storage, Avatars } from "appwrite";

interface AppwriteConfigProps {
    projectId: string;
    url: string;
}

export const appwriteConfig: AppwriteConfigProps = {
    projectId: process.env.APPWRITE_PROJECT_ID || "",
    url: process.env.APPWRITE_URL || "",
};

export const client = new Client();
client.setProject(appwriteConfig.projectId);
client.setEndpoint(appwriteConfig.url);
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
