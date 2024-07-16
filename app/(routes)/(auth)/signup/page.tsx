import Background from "@/components/Background";
import SignUpForm from "@/components/form/SignUpForm";
import Image from "next/image";
import React from "react";

const page = () => {
    return (
        <div className=" grid grid-cols-3">
            <SignUpForm />
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
