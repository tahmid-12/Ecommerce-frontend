import { getCookies } from "@/actions/cookie";
import { Logo } from "@/assets/images";
import { sub_nav } from "@/constants";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CartIcon from "./CartIcon";
import { ProfileAvatar } from "./ProfileAvatar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import SearchBar from "./SearchBar";

export default async function Navbar() {
  const isAuth = await getCookies("__auth");
  return (
    <nav className="hidden text-white md:block bg-primary">
      <section className="container">
        {/* upper div */}
        <div className="flex flex-col justify-between pt-1 sm:flex-row">
          {/* list data */}
          <div className="flex gap-3 ">
            <a
              href={"https://seller.darkak.com.bd"}
              className="cursor-pointer hover:text-card"
            >
              Become a Seller
            </a>
            {/* {sub_nav.map((item) => (
              <Link
                href={item.link}
                key={item.id}
                className="cursor-pointer hover:text-card"
              >
                {item.title}
              </Link>
            ))} */}
          </div>

          <div className={`flex gap-2 text-xl`}>
            <Image src={Logo} alt="small-logo" className="w-5 h-5" />
            <small>Visit app for more update</small>
          </div>
        </div>
        {/* lower section */}
        <div className="center">
          <Link href={'/'}>
            <Image
              src={Logo}
              alt="logo"
              className="w-20 h-20 cursor-pointer"
            />
          </Link>
          {/* <div className=" xl:w-[70%] lg:w-[60%] w-[40%] bg-card sm:flex hidden items-center rounded-[30px] gap-1 px-5 py-1 shadow-3xl">
            <Input
              className="w-full h-8 px-3 text-xl text-gray-700 border-none outline-0 bg-card rounded-2xl placeholder:text-gray-400 placeholder:text-xl"
              placeholder="Enter the product you are looking for "
            />
            <Button
              type={"submit"}
              className="bg-primary rounded-2xl  hover:bg-[#F85606]/30"
            >
              <Search size={15} />
            </Button>
          </div> */}
          <SearchBar />

          <div className="flex items-center gap-1 text-md">
            {isAuth ? (
              <ProfileAvatar />
            ) : (
              <div className="flex ">
                <Link
                  href={"/sign-in"}
                  className="flex border-r-[3px] border-white px-2 pt-0.5"
                >
                  {/* <User size={25} /> */}
                  <h4>Sign In</h4>
                </Link>
                <Link href={"/sign-up"} className="flex gap-2 px-2 pt-0.5">
                  <h4>Sign Up</h4>
                </Link>
              </div>
            )}
            <CartIcon />
          </div>
        </div>
      </section>
    </nav>
  );
}
