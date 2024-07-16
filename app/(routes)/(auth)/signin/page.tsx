import Background from "@/components/Background";
import SignInForm from "@/components/form/SignInForm";
import Image from "next/image";
import React from "react";

const page = () => {
    return (
        <div className="md:grid md:grid-cols-3">
            <SignInForm />
            <div className="w-full relative h-screen col-span-2">
                <Image
                    src="/cover.jpg"
                    fill
                    alt=""
                    className="object-cover"
                    priority
                ></Image>
            </div>
        </div>
    );
};

export default page;
