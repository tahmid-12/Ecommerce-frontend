import { footerLists } from "@/constants";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const { info, usefulLinks, paymentMethods, getUs, findUs } = footerLists;
  return (
    <>
      <div className="md:block hidden border-border border-[1px] shadow-4xl py-8 bg-white">
        <div className="container  mx-auto flex flex-wrap  justify-between xl:gap-0 gap-10">
          {/* Information */}
          <div>
            <Image src={info.img} alt="logo" className="w-30 h-30" />
            <p className="text-primary  text-xl mt-5 w-[290px]">{info.disc}</p>
          </div>
          {/* useful link */}
          <div>
            <h3 className="footerTitle">Useful Links</h3>
            <div className="flex flex-col mt-2">
              {usefulLinks.map((item) => (
                <Link
                  key={item.id}
                  href={item.link}
                  className="text-primary mb-2 text-xl hover:text-[#F85606]/30"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
          {/* paymentMethods */}
          <div>
            <h3 className="footerTitle">Payment Methods</h3>
            <div className="grid grid-cols-3 mt-2">
              {paymentMethods.flatMap((item, index) => (
                <Image
                  key={index}
                  src={item}
                  alt="index"
                  className={`w-10 h-10 ${
                    index !== paymentMethods.length - 1 ? "mb-5" : ""
                  }`}
                />
              ))}
            </div>
          </div>
          {/* getUs */}
          <div>
            <h3 className="footerTitle">Get Us</h3>
            <div className="flex flex-col gap-5 ">
              {getUs.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 border-primary border-[1px] h-14 px-5 rounded-2xl items-center"
                >
                  <Image src={item.img} alt={item.title} />
                  <div className="text-sm">
                    <p>{item.subTitle}</p>
                    <p className="font-bold">{item.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* find us */}
          <div>
            <h3 className="footerTitle">Find Us</h3>
            <div className="mt-3">
              {findUs.data.map((item) => (
                <p key={item.id} className="text-primary  text-xl">
                  {item.title}: {item.data}
                </p>
              ))}
            </div>
            <div className="flex gap-4 mt-2">
              {findUs.icon.map((item) => (
                <Link key={item.id} href={item.link} className="cursor-pointer" target="_blank">
                  <Image src={item.icon} alt="item" />
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
}
