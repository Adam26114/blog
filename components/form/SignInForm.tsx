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
import { MdOutlineEmail, MdOutlinePassword } from "react-icons/md";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash, FaGoogle } from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { baseURL } from "@/constants/endpoints";
import { paths } from "@/constants/paths";
import { ToastAction } from "@radix-ui/react-toast";
import { storeInSession } from "@/common/session";

const FormSchema = z.object({
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

const SignInForm = () => {
    const [eyeOpen, setEyeOpen] = useState(false);
    
    // useContext

    function hundleEyeOpen() {
        setEyeOpen(!eyeOpen);
    }

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });



    function onSubmit(data: z.infer<typeof FormSchema>) {

        toast({
            title: "Signing in...",
            description: "Please wait while we sign you in.",
        });

        try {
            axios
                .post(baseURL + paths.signin, data)
                .then((response) => {
                    storeInSession("user", JSON.stringify(data));
                    console.log(sessionStorage)
                    toast({
                        title: "Sign In Successful",
                        description: "You have successfully signed in!",
                    });
                    // Redirect to the desired page or update the UI as needed
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
                });
        } catch (error) {
            console.error("An error occurred:", error);
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "An unexpected error occurred.",
            });
        }
    }

    return (
        <AnimationWrapper type="down" key="">
            <div className=" h-cover app-center  ">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-full flex flex-col gap-10 bg-white dark:bg-black px-10"
                    >
                        <h1 className="text-4xl font-gelasio capitalize text-center">
                            Welcome back
                        </h1>
                        <div className=" flex flex-col gap-4 ">
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
                                <Button className=" capitalize" type="submit">
                                    {/* {type.replace("-", " ")} */}
                                    Sign In
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
                                Join Us Now !
                                <Link
                                    href="/signup"
                                    className=" text-blue-500 text-not hover:underline ml-1"
                                >
                                    Sign Up Here.
                                </Link>
                            </p>
                        </div>
                    </form>
                </Form>
            </div>
        </AnimationWrapper>
    );
};

export default SignInForm;
