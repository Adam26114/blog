import React, { ReactNode } from "react";
import { AnimatePresence, motion, easeOut } from "framer-motion";
interface AnimationWrapperProps {
    children: ReactNode;
    type: "up" | "down" | null;
    key: string | null;
}

const AnimationWrapper: React.FC<AnimationWrapperProps> = ({
    key,
    children,
    type = "up",
}) => {
    return (
        <motion.div
            key={key}
            whileInView={{
                y: [type === "up" ? -100 : 100, 0],
                opacity: [0, 1],
            }}
            transition={{ duration: 1, ease: "easeOut" }}
        >
            {children}
        </motion.div>
    );
};

export default AnimationWrapper;
