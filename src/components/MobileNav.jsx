import { FaAngleLeft } from "react-icons/fa6";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { BsThreeDots } from "react-icons/bs";
import { FaCartShopping } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import Link from "next/link";
import CartIcon from "./CartIcon";

export default function MobileNav({title, isSearch, isCart, isDot, link}) {

  return (
    <nav className='bg-primary md:hidden fixed top-0 w-full center  px-4 py-2 z-50  gap-2'>
      <div className="flex text-white">
        <Link href={link? link : '/'} className="text-3xl  flex gap-3"><FaAngleLeft /></Link>
        <h1 className="text-2xl font-bold pt-0.5">{title}</h1>
      </div>


      <div className="text-3xl text-white flex gap-5 ">
        {isSearch&&<Link href={'#'} className=''><CiSearch /></Link>}
        {isCart&&<CartIcon/>}
        {isDot&&<BsThreeDots />}
      </div>
    </nav>
  )
}
