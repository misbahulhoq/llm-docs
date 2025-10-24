import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="px-5 flex justify-between">
      <Link href={"/"}>Home</Link>
    </nav>
  );
};

export default Navbar;
