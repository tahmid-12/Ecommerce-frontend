import { AppleStore, Authentic, Bkash, Cash, Cloth1, Cloth2, Darkak, Delivery, Express, Facebook, Facebook1, Fashion3, Fashion5, Google, GoogleStore, Guaranteed, Instagram, Linkedin, Logo2, Master, Nogod, Offer, Product, Returns, Rocket, Safe, Slider1, Slider2, Slider3, Tshirt, Twitter, Visa, Youtube, slider2 } from "@/assets/images"
import { BsCart3, BsHeart } from "react-icons/bs"
import { HiMiniUser } from "react-icons/hi2"
import { IoHomeOutline } from "react-icons/io5"
import { LiaShoppingBagSolid } from "react-icons/lia"
import { FiUser } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { HiArrowUturnRight } from "react-icons/hi2";
import { IoCloseSharp } from "react-icons/io5"
import { FaRegStar } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";
import { GoQuestion } from "react-icons/go";

const sub_nav = [
    {
        id: 2,
        title: "Donates",
        link: '/'
    },
    {
        id: 3,
        title: "Help & Support",
        link: '/'
    },
]

const footerLists = {
    info: {
        img: Logo2,
        disc: 'Darkak Mart is a modern online store offering a wide range of high-quality products, from electronics to everyday essentials, ensuring convenience and customer satisfaction with every purchase.'
    },
    usefulLinks: [
        {
            id: 1,
            title: 'About Us',
            link: '#'
        },
        {
            id: 2,
            title: 'Help Center',
            link: '#'
        },
        {
            id: 3,
            title: 'How to Buy',
            link: '#'
        },
        {
            id: 4,
            title: 'Return & refunds',
            link: '/refund-return-policy'
        },
        {
            id: 5,
            title: 'Contact Us',
            link: '/contact'
        },
        {
            id: 6,
            title: 'Terms & Conditions',
            link: '/terms-and-conditions'
        },
        {
            id: 7,
            title: 'Privacy Policy',
            link: '/privacy-policy'
        },
    ],
    paymentMethods: [Bkash, Visa, Nogod, Master, Rocket, Express, Cash],
    getUs: [
        {
            id: 1,
            img: GoogleStore,
            title: "Google Play",
            subTitle: "Get it on"
        },
        {
            id: 2,
            img: AppleStore,
            title: "Apple Store",
            subTitle: "Download on the"
        },
    ],
    findUs: {
        data: [
            {
                id: 1,
                title: 'Address',
                data: 'Dhaka, Bangladesh'
            },
            {
                id: 2,
                title: 'Phone',
                data: '+88019000000'
            },
            {
                id: 3,
                title: 'Email',
                data: 'admin@darkak.com.bd'
            },
        ],
        icon: [
            {
                id: '1',
                icon: Facebook,
                link: 'https://www.facebook.com/darkakmart?_rdc=1&_rdr#'
            },
            {
                id: '2',
                icon: Twitter,
                link: '#'
            },
            {
                id: '3',
                icon: Instagram,
                link: '#'
            },
            {
                id: '4',
                icon: Youtube,
                link: '#'
            },
            {
                id: '5',
                icon: Linkedin,
                link: '#'
            },
        ]
    }
}

const mobileFooterList = [
    {
        id: 1,
        title: 'Home',
        icon: <IoHomeOutline />,
        link: '/'
    },
    {
        id: 2,
        title: 'Catagory',
        icon: <LiaShoppingBagSolid />,
        link: '/catagory'
    },
    {
        id: 3,
        title: 'Cart',
        icon: <BsCart3 />,
        link: '/cart'
    },
    {
        id: 4,
        title: 'Favorite',
        icon: <BsHeart />,
        link: '/favorite'
    },
    {
        id: 5,
        title: 'Profile',
        icon: <HiMiniUser />,
        link: '/profile'
    },
]


//  home section
const catagories = [
    {
        id: 1,
        title: "Woman's & Girl's Fashion",
        icon: Tshirt,
        items: [
            {
                id: 1,
                title: 'Cloth 1',
                link: '',
                lists: [
                    {
                        id: 1,
                        title: 'Cloth 1.1',
                        img: Cloth1,
                        link: ''
                    },
                    {
                        id: 2,
                        title: 'Cloth 1.2',
                        img: Cloth2,
                        link: ''
                    },

                ]
            },
            {
                id: 2,
                title: 'Cloth 2'
            },

        ]
    },
    {
        id: 2,
        title: "Health & Beauty",
        icon: Tshirt
    },
    {
        id: 3,
        title: "Watch, Bags, Jewellery",
        icon: Tshirt
    },
    {
        id: 4,
        title: "Men's & Body's Fashion",
        icon: Tshirt
    },
    {
        id: 5,
        title: "Mother & Baby",
        icon: Tshirt
    },
    {
        id: 6,
        title: "Electronics Devices",
        icon: Tshirt
    },
    {
        id: 7,
        title: "Tv & Home Appliances",
        icon: Tshirt
    },
    {
        id: 8,
        title: "Electronics Accessories",
        icon: Tshirt
    },
    {
        id: 9,
        title: "Groceries",
        icon: Tshirt
    },
    {
        id: 10,
        title: "Home & Lifestyle",
        icon: Tshirt
    },
    {
        id: 11,
        title: "Sport & Outdoors",
        icon: Tshirt
    },
    {
        id: 12,
        title: "Automotive & Motorbike",
        icon: Tshirt
    },
]

const sliderImages = [
    Slider1,
    Slider2,
    Slider3,
    // Add more image URLs as needed
];

const benefits = [
    {
        id: 1,
        title: 'Safe Payment',
        icon: Safe
    },
    {
        id: 2,
        title: 'Nationwide Delivery',
        icon: Delivery
    },
    {
        id: 3,
        title: 'Free & Easy Returns',
        icon: Returns
    },
    {
        id: 4,
        title: 'Best Price Guaranteed',
        icon: Guaranteed
    },
    {
        id: 5,
        title: '100% Authentic Products',
        icon: Authentic
    },
    {
        id: 6,
        title: 'Darkak Verified',
        icon: Darkak
    },
]

const features = [
    {
        id: 1,
        img: Offer,
        title: 'Everyday Low Price'
    },
    {
        id: 2,
        img: Offer,
        title: 'Free Delivery'
    },
    {
        id: 3,
        img: Offer,
        title: 'Fashion'
    },
    {
        id: 4,
        img: Offer,
        title: 'Beauty & Glamour'
    },
    {
        id: 5,
        img: Offer,
        title: 'Mart'
    },
    {
        id: 6,
        img: Offer,
        title: 'Home Makeover'
    },
    {
        id: 7,
        img: Offer,
        title: 'Best Price Guaranteed'
    },
    {
        id: 8,
        img: Offer,
        title: 'Budget'
    },
    {
        id: 9,
        img: Offer,
        title: 'Darkak Card'
    },
]

const products = [
    {
        id: 1,
        img: Product,
        title: "Watch of White Band",
        newPrice: '89.99',
        oldPrice: '129.99',
        percentage: '30',
        review: 280,
        rate: 100
    },
    {
        id: 2,
        img: Product,
        title: "Watch of White Band",
        newPrice: '89.99',
        oldPrice: '129.99',
        percentage: '30',
        review: 280,
        rate: 100
    },
    {
        id: 3,
        img: Product,
        title: "Watch of White Band",
        newPrice: '89.99',
        oldPrice: '129.99',
        percentage: '30',
        review: 280,
        rate: 100
    },
    {
        id: 4,
        img: Product,
        title: "Watch of White Band",
        newPrice: '89.99',
        oldPrice: '129.99',
        percentage: '30',
        review: 280,
        rate: 100
    },
    {
        id: 5,
        img: Product,
        title: "Watch of White Band",
        newPrice: '89.99',
        oldPrice: '129.99',
        percentage: '30',
        review: 280,
        rate: 100
    },
    {
        id: 6,
        img: Product,
        title: "Watch of White Band",
        newPrice: '89.99',
        oldPrice: '129.99',
        percentage: '30',
        review: 280,
        rate: 100
    },
    {
        id: 7,
        img: Product,
        title: "Watch of White Band",
        newPrice: '89.99',
        oldPrice: '129.99',
        percentage: '30',
        review: 280,
        rate: 100
    },
    {
        id: 8,
        img: Product,
        title: "Watch of White Band",
        newPrice: '89.99',
        oldPrice: '129.99',
        percentage: '30',
        review: 280,
        rate: 100
    },
    {
        id: 9,
        img: Product,
        title: "Watch of White Band",
        newPrice: '89.99',
        oldPrice: '129.99',
        percentage: '30',
        review: 280,
        rate: 100
    },
    {
        id: 10,
        img: Product,
        title: "Watch of White Band",
        newPrice: '89.99',
        oldPrice: '129.99',
        percentage: '30',
        review: 280,
        rate: 100
    },
    {
        id: 11,
        img: Product,
        title: "Watch of White Band",
        newPrice: '89.99',
        oldPrice: '129.99',
        percentage: '30',
        review: 280,
        rate: 100
    },
    {
        id: 12,
        img: Product,
        title: "Watch of White Band",
        newPrice: '89.99',
        oldPrice: '129.99',
        percentage: '30',
        review: 280,
        rate: 100
    },
    {
        id: 13,
        img: Product,
        title: "Watch of White Band",
        newPrice: '89.99',
        oldPrice: '129.99',
        percentage: '30',
        review: 280,
        rate: 100
    },
    {
        id: 14,
        img: Product,
        title: "Watch of White Band",
        newPrice: '89.99',
        oldPrice: '129.99',
        percentage: '30',
        review: 280,
        rate: 100
    },
    {
        id: 15,
        img: Product,
        title: "Watch of White Band",
        newPrice: '89.99',
        oldPrice: '129.99',
        percentage: '30',
        review: 280,
        rate: 100
    },
    {
        id: 16,
        img: Product,
        title: "Watch of White Band",
        newPrice: '89.99',
        oldPrice: '129.99',
        percentage: '30',
        review: 280,
        rate: 100
    },
    {
        id: 17,
        img: Product,
        title: "Watch of White Band",
        newPrice: '89.99',
        oldPrice: '129.99',
        percentage: '30',
        review: 280,
        rate: 100
    },
    {
        id: 18,
        img: Product,
        title: "Watch of White Band",
        newPrice: '89.99',
        oldPrice: '129.99',
        percentage: '30',
        review: 280,
        rate: 100
    },
    {
        id: 19,
        img: Product,
        title: "Watch of White Band",
        newPrice: '89.99',
        oldPrice: '129.99',
        percentage: '30',
        review: 280,
        rate: 100
    },
    {
        id: 20,
        img: Product,
        title: "Watch of White Band",
        newPrice: '89.99',
        oldPrice: '129.99',
        percentage: '30',
        review: 280,
        rate: 100
    },
    {
        id: 21,
        img: Product,
        title: "Watch of White Band",
        newPrice: '89.99',
        oldPrice: '129.99',
        percentage: '30',
        review: 280,
        rate: 100
    },
    {
        id: 22,
        img: Product,
        title: "Watch of White Band",
        newPrice: '89.99',
        oldPrice: '129.99',
        percentage: '30',
        review: 280,
        rate: 100
    },
    {
        id: 23,
        img: Product,
        title: "Watch of White Band",
        newPrice: '89.99',
        oldPrice: '129.99',
        percentage: '30',
        review: 280,
        rate: 100
    },
    {
        id: 24,
        img: Product,
        title: "Watch of White Band",
        newPrice: '89.99',
        oldPrice: '129.99',
        percentage: '30',
        review: 280,
        rate: 100
    },

]


// form section 
const thirdParty = [
    {
        id: 1,
        img: Facebook1,
        title: "Facebook"
    },
    {
        id: 2,
        img: Google,
        title: "Google"
    },
]

const prodCatagories = [
    {
        id: 1,
        title: 'Western Wear',
        img: Fashion3
    },
    {
        id: 2,
        title: 'Western Wear',
        img: Fashion3
    },
    {
        id: 3,
        title: 'Western Wear',
        img: Fashion3
    },
    {
        id: 4,
        title: 'Western Wear',
        img: Fashion3
    },
    {
        id: 5,
        title: 'Western Wear',
        img: Fashion5
    },
    {
        id: 6,
        title: 'Western Wear',
        img: Fashion3
    },
]

const traditionalCloths = [
    {
        id: 1,
        title: 'Promotion',
        list: ["Free Delivery", "Best Price Guaranteed", "Authentic Brands", "Darkak Verified", "Cash On Delivery", "Installment"],
        check: false
    },
    {
        id: 2,
        title: "Products",
        list: ['Sarees', 'Unstitched Fabric', 'Kurtis', 'Shalwar Kameez', 'Bulk Deals', 'Dupattas & Stoles', 'Party Wear', 'Palazzo Pants & Culottes'],
        check: false
    },
    {
        id: 3,
        title: "Brand",
        list: ['Usha Fashion', "Usha Fashion", "Usha Fashion", "Usha Fashion", "Usha Fashion", "Usha Fashion", "Usha Fashion", "Usha Fashion"],
        check: true
    },
    {
        id: 4,
        title: 'Color',
        list: [
            {
                id: 1,
                name: 'Multicolor',
                code: '#FFFFFF'
            }, {
                id: 2,
                name: 'Red',
                code: '#FF0000'
            },
            {
                id: 3,
                name: 'Black',
                code: '#000000'
            },
            {
                id: 4,
                name: 'Green',
                code: '#00CE30'
            }
        ],
        check: false
    },
    {
        id: 5,
        title: 'Size',
        list: ['S', "L", "M", "XL", "XXL"],
        check: true
    },
    {
        id: 6,
        title: 'Price',
        check: false
    },
    {
        id: 7,
        title: 'Rating',
        list: [5, 4, 3, 2, 1],
        check: false
    },
    {
        id: 8,
        title: "Location",
        list: ["Dhaka", "Khulna", "Barishal", "Chattogram", "Rajshahi", "Rangpur", "Sylhet"],
        check: true
    },
    {
        id: 9,
        title: 'Warranty Type',
        list: ["No Warranty", "Seller Warranty", "Brand Warranty", "Non-Local Warranty", "Local Seller"],
        check: true
    },
    {
        id: 10,
        title: 'Apparel Type',
        list: ['Un-stitched', 'Semi-stitched'],
        check: true
    },
    {
        id: 11,
        title: 'Warranty Period',
        list: ['1 Month', '6 Months', '12 Months', '18 Months'],
        check: true
    }
]


const accountLink = [
    {
        id: 1,
        title: 'My Profile',
        link: '/profile',
        icon: <FiUser/>
    },
    {
        id: 2,
        title: 'Address Book',
        link: '/address-book',
        icon: <IoLocationOutline/>
    },
    {
        id: 3,
        title: 'My Orders',
        link: '/my-order',
        icon: <HiOutlineShoppingBag/>
    },
    {
        id: 4,
        title: 'My Payment Options',
        link: '#',
        icon: <FaMoneyCheckDollar/>
    },
    {
        id: 5,
        title: 'My Returns',
        link: '/my-returns',
        icon: <HiArrowUturnRight/>
    },
    {
        id: 6,
        title: 'My Cancellations',
        link: '/my-cancellation',
        icon: <IoCloseSharp/>
    },
    {
        id: 7,
        title: 'My Reviews',
        link: '/my-reviews',
        icon: <FaRegStar/>
    },
    {
        id: 8,
        title: 'My Wishlist & Followed Store',
        link: '/wishlist',
        icon: <CiHeart />
    },
    {
        id: 10,
        title: 'Help',
        link: '#',
        icon: <GoQuestion/>
    },
]

const sortBy = ['Best Match', 'Top Sales', 'Newest Arrivals', "Price Low to high", "Price high to Low"]
export { sub_nav, footerLists, catagories, benefits, features, products, mobileFooterList, sliderImages, thirdParty, prodCatagories, traditionalCloths, sortBy, accountLink }