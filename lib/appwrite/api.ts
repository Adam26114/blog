import { INewUser } from "@/types";
import { account } from "./config";
import { ID } from "appwrite";

export async function createUserAccount(user: INewUser) {
    try {
        const newAccount = await account.create(
            ID.unique(),
            user.fullname,
            user.email,
            user.password,
        );
    } catch (error) {
        console.log(error);
        return error;
    }
}
