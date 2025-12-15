"use client";
import { useGetCurrentUserQuery } from "@/redux/api/currentUser";
import Link from "next/link";
import { usePathname } from "next/navigation";

const profileNavData = [
  {
    id: 1,
    title: "Manage My Account",
    isSub: true,
    link: "/my-account",
    subTitleList: [
      {
        id: 1,
        title: "My Profile",
        link: "/profile",
      },
      {
        id: 2,
        title: "Address Book",
        link: "/address-book",
      },
    ],
  },
  {
    id: 2,
    title: "My Orders",
    isSub: true,
    link: "/my-order",
    subTitleList: [
      {
        id: 1,
        title: "My Returns",
        link: "/my-returns",
      },
      {
        id: 2,
        title: "My Cancellation",
        link: "/my-cancellation",
      },
    ],
  },
  {
    id: 3,
    title: "My Reviews",
    isSub: false,
    link: "/my-reviews",
  },
  {
    id: 4,
    title: "My Wishlist & Followed Stores",
    isSub: false,
    link: "/wishlist",
  },
];

export default function SideBar() {
  const path = usePathname();
  const { data } = useGetCurrentUserQuery();
  
  return (
    <div className="w-[230px] pt-5 md:block hidden">
      {/* person name */}
      <div className="w-[80%] text-md ">
        <p>Hello, {data?.user?.name}</p>
      </div>

      {/* sidebar link */}
      <div className="mt-7">
        {profileNavData.map((item) => (
          <div key={item.id} className="mb-5">
            <Link
              href={item.link}
              className={`${
                path === item.link && "text-primary"
              } text-lg font-bold hover:text-primary`}
            >
              {item.title}
            </Link>
            {/* sub link list */}
            <div className="ml-7 mt-2 space-y-1 flex flex-col">
              {item.isSub &&
                item.subTitleList.map((item) => (
                  <Link
                    href={item.link}
                    key={item.id}
                    className={`${
                      path === item.link && "text-primary"
                    }  hover:text-primary text-md`}
                  >
                    {item.title}
                  </Link>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
