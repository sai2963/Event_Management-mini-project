import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ href, children }) {
  const path = usePathname();
  return (
    <div>
      <Link
        href={href}
        className="relative group text-gray-300 hover:text-white transition-all duration-300 text-sm font-semibold"
      >
        <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text group-hover:from-cyan-300 group-hover:to-blue-400 transition-all duration-300">
          {children}
        </span>
        <span
          className={
            path.startsWith(href)
              ? "absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 scale-x-100 transition-transform duration-300 origin-left"
              : "absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
          }
        ></span>
      </Link>
    </div>
  );
}
