"use client";
import React, { FormEvent, ReactNode, useRef, useState } from "react";

import * as z from "zod";
import { Form, useForm } from "react-hook-form";
import { SignupValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AnimationWrapper from "@/common/PageAnimation";
import { useToast } from "@/components/ui/use-toast";

import { FiUser } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { MdOutlinePassword } from "react-icons/md";
import { FaEyeSlash, FaGoogle } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

interface UserAuthFomProps {
    type: string;
}

const FormSchema = z.object({
    fullname: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    email: z.string().min(2, {
        message: "Username must be at least 3 characters.",
    }),
    password: z.string().min(2, {
        message: "Username must be at least 3 characters.",
    }),
});

const UserAuthFom: React.FC<UserAuthFomProps> = ({ type }) => {
    const { toast } = useToast();
    const router = useRouter();

    const [eyeOpen, setEyeOpen] = useState(false);
    function hundleEyeOpen() {
        setEyeOpen(!eyeOpen);
    }

    // const form = useForm<z.infer<typeof SignupValidation>>({
    //     resolver: zodResolver(SignupValidation),
    //     defaultValues: {
    //         fullname: "",
    //         email: "",
    //         password: "",
    //     },
    // });

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            fullname: "",
            email: "",
            password: "",
        },
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">
                        {JSON.stringify(data, null, 2)}
                    </code>
                </pre>
            ),
        });
    }

    return (
        <AnimationWrapper type="down" key="">
            <section className=" h-cover app-center">
                <Form {...form}>
                    <form
                        // onSubmit={form.handleSubmit(onSubmit)}
                        className="w-[80%] max-w-[400px] flex flex-col gap-10"
                    >
                        <h1 className="text-4xl font-gelasio capitalize text-center">
                            {type === "sign-in"
                                ? "Welcome back"
                                : "Join us today"}
                        </h1>
                        <FormField
                            control={form.control}
                            name="fullname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Fullname</FormLabel>
                                    <FormControl className="relative">
                                        <Input
                                            className="pl-10"
                                            placeholder="Full Name"
                                            {...field}
                                        />
                                        <FiUser className="absolute left-3 top-[50%] translate-y-[-50%] w-5 h-5 text-gray-500" />
                                    </FormControl>
                                    <FormDescription>
                                        This is your public display name.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
                <form
                    // onSubmit={handleSubmit}
                    // ref={authForm}
                    className="w-[80%] max-w-[400px] flex flex-col gap-10"
                >
                    <h1 className="text-4xl font-gelasio capitalize text-center">
                        {type === "sign-in" ? "Welcome back" : "Join us today"}
                    </h1>
                    <div className=" flex flex-col gap-4 ">
                        {type !== "sign-in" ? (
                            <div className="relative">
                                <Input
                                    name="fullname"
                                    type="text"
                                    placeholder="Full Name"
                                    className="pl-10 "
                                />

                                <FiUser className="absolute left-3 top-[50%] translate-y-[-50%] w-5 h-5 text-gray-500" />
                            </div>
                        ) : (
                            ""
                        )}

                        <div className="relative">
                            <Input
                                name="emaill"
                                type="email"
                                placeholder="Email"
                                className="pl-10 "
                            />

                            <MdOutlineEmail className="absolute left-3 top-[50%] translate-y-[-50%] w-5 h-5 text-gray-500" />
                        </div>

                        <div className="relative">
                            <Input
                                name="password"
                                type={!eyeOpen ? "password" : "text"}
                                placeholder="Password"
                                className="pl-10 "
                            />

                            <MdOutlinePassword className="absolute left-3 top-[50%] translate-y-[-50%] w-5 h-5 text-gray-500" />
                            <Button
                                className=" absolute right-3 top-[50%] translate-y-[-50%] w-6 h-6  cursor-pointer text-gray-500"
                                variant="ghost"
                                size="icon"
                                type="button"
                                onClick={hundleEyeOpen}
                            >
                                {eyeOpen ? <IoEyeSharp /> : <FaEyeSlash />}
                            </Button>
                        </div>
                    </div>

                    <div className=" flex items-center gap-3 justify-end">
                        <Button variant="secondary" type="button">
                            Cancle
                        </Button>
                        <Button className=" capitalize" type="submit">
                            {type.replace("-", " ")}
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

                    {type == "sign-in" ? (
                        <p className="text-center text-gray-500">
                            Don&apos;t have an account ?
                            <Link
                                href="/signup"
                                className=" text-blue-500 hover:underline ml-1"
                            >
                                Join us now
                            </Link>
                        </p>
                    ) : (
                        <p className="text-center text-gray-500">
                            Already have an account ?
                            <Link
                                href="/signin"
                                className=" text-blue-500 text-not hover:underline ml-1"
                            >
                                Sign In Here.
                            </Link>
                        </p>
                    )}
                </form>
            </section>
        </AnimationWrapper>
    );
};

export default UserAuthFom;
