"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import AnimationWrapper from "@/common/PageAnimation";

// icon
import { FiUser } from "react-icons/fi";
import { MdOutlineEmail, MdOutlinePassword } from "react-icons/md";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash, FaGoogle } from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { paths } from "@/constants/paths";
import { ToastAction } from "@radix-ui/react-toast";
import { baseURL } from "@/constants/endpoints";
import { storeInSession } from "@/common/session";
import { json } from "stream/consumers";

// interface SignUpProps {
//     type: string;
// }

const FormSchema = z.object({
    fullname: z
        .string()
        .min(3, "Fullname must be at least 3 characters long!")
        .max(100),
    email: z.string().min(1, "Email is required").email("Invalid email!"),
    password: z
        .string()
        .min(1, "Password is required !")
        .min(6, "Password should be 6 to 20 characters long !")
        .regex(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/,
            "Password should containe a numeric, 1 lowercase and 1 uppercase letter!"
        ),
});

const SignUpForm = () => {
    const [eyeOpen, setEyeOpen] = useState(false);
    function hundleEyeOpen() {
        setEyeOpen(!eyeOpen);
    }

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            fullname: "",
            email: "",
            password: "",
        },
    });

    const [isLoading, setIsLoading] = useState(false);

    function onSubmit(data: z.infer<typeof FormSchema>) {
        setIsLoading(true);
        try {
            axios
                .post(baseURL + paths.signup, data)
                .then((response) => {
                    storeInSession("user", JSON.stringify(data));
                    toast({
                        title: "Sign Up Successful",
                        description: "You have successfully signed up!",
                    });
                    // Reset the form after successful submission
                    form.reset();
                })
                .catch((error) => {
                    toast({
                        variant: "destructive",
                        title: "Uh oh! Something went wrong.",
                        description: error.response.data.error,
                        action: (
                            <ToastAction altText="Try again">
                                Try again
                            </ToastAction>
                        ),
                    });
                })
                .finally(() => {
                    setIsLoading(false); // Stop loading
                });
        } catch (error) {
            console.error("An error occurred:", error);
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "An unexpected error occurred.",
            });
            setIsLoading(false); // Stop loading
        }
    }

    return (
        <AnimationWrapper type="down" key="">
            <div className=" h-cover app-center">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-full flex flex-col gap-10 bg-white dark:bg-black px-10"
                        autoComplete="false"
                    >
                        <h1 className="text-4xl font-gelasio capitalize text-center">
                            Join us today
                        </h1>
                        <div className=" flex flex-col gap-4 ">
                            <FormField
                                control={form.control}
                                name="fullname"
                                render={({ field }) => (
                                    <FormItem className="relative">
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    type="text"
                                                    placeholder="Full Name"
                                                    className="pl-10 "
                                                    autoComplete="false"
                                                    {...field}
                                                />
                                                <FiUser className="absolute left-3 top-[50%] translate-y-[-50%] w-5 h-5 text-gray-500" />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className="relative">
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    type="email"
                                                    placeholder="Enter Email"
                                                    className="pl-10 "
                                                    autoComplete="false"
                                                    {...field}
                                                />
                                                <MdOutlineEmail className="absolute left-3 top-[50%] translate-y-[-50%] w-5 h-5 text-gray-500" />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem className="relative">
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    type={
                                                        !eyeOpen
                                                            ? "password"
                                                            : "text"
                                                    }
                                                    placeholder="Enter Password"
                                                    className="pl-10 "
                                                    autoComplete="false"
                                                    {...field}
                                                />
                                                <MdOutlinePassword className="absolute left-3 top-[50%] translate-y-[-50%] w-5 h-5 text-gray-500" />
                                                <Button
                                                    className=" absolute right-3 top-[50%] translate-y-[-50%] w-6 h-6  cursor-pointer text-gray-500"
                                                    variant="ghost"
                                                    size="icon"
                                                    type="button"
                                                    onClick={hundleEyeOpen}
                                                >
                                                    {eyeOpen ? (
                                                        <IoEyeSharp />
                                                    ) : (
                                                        <FaEyeSlash />
                                                    )}
                                                </Button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className=" flex items-center gap-3 justify-end">
                                <Button variant="secondary" type="button">
                                    Cancle
                                </Button>
                                <Button
                                    className=" capitalize"
                                    type="submit"
                                    disabled={isLoading}
                                >
                                    {/* {type.replace("-", " ")} */}
                                    Sign Up
                                </Button>
                            </div>

                            <div className=" relative w-full flex items-center gap-2 mpy-10 opacity-10 uppercase text-black font-bold">
                                <hr className="w-1/2 border-black" />
                                <p>or</p>
                                <hr className="w-1/2 border-black" />
                            </div>

                            <Button
                                type="button"
                                className=" capitalize flex items-center gap-3"
                            >
                                <FaGoogle className="w-4 h-4" />
                                Continue with Google
                            </Button>

                            <p className="text-center text-gray-500">
                                Already have an account ?
                                <Link
                                    href="/signin"
                                    className=" text-blue-500 text-not hover:underline ml-1"
                                >
                                    Sign In Here.
                                </Link>
                            </p>
                        </div>
                    </form>
                </Form>
            </div>
        </AnimationWrapper>
    );
};

export default SignUpForm;
