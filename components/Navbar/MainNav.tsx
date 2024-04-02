import { NavLinks } from "./Navlink";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

interface MainNavProps {
    isOpen: boolean;
    isDark: boolean;
}

const MainNav: React.FC<MainNavProps> = ({ isOpen, isDark }) => {
    const pathname = usePathname();

    const routes = NavLinks?.map((route) => ({
        url: `/${route.name}`,
        label: route.name,
        active: pathname === `/${route.name}`,
    }));

    return (
        <nav
            className={`${
                isOpen ? " block" : " hidden md:block"
            } absolute md:static
                     left-0 top-[80px] w-full md:w-auto ${
                         isDark && " hover:text-white"
                     } md:bg-transparent shadow-md md:shadow-none py-10 md:py-0 md:backdrop-blur-0 z-20`}
        >
            <ul className=" flex flex-col md:flex-row gap-4 items-center  select-none">
                {routes.map((route, idx) => (
                    <li key={route.label}>
                        <Link
                            href={route.url}
                            className={`capitalize  font-medium transition-colors text-neutral-500  ${
                                route.active ? "text-black" : ""
                            } ${
                                isDark ? "hover:text-white" : "hover:text-black"
                            }`}
                        >
                            {route.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default MainNav;
