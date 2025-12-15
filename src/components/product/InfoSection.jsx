"use client";
import { StarFull } from "@/assets/images";
import { footerLists } from "@/constants";
import { cn, getDiscountPercentage, successMessage } from "@/lib/utils";
import {
  useAddToCartMutation,
  useGetCartsQuery,
  useUpdateCartMutation,
} from "@/redux/api/cart";
import {
  useAddToWishlistMutation,
  useGetWishlistQuery,
  useRemoveFromWishlistMutation,
} from "@/redux/api/wishlist";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { BsHeart } from "react-icons/bs";
import QuantityInput from "../QuantityInput";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useAuth } from "@/auth";
import { SingleOrderDialog } from "..";

const productType = {
  id: "",
  name: "",
  regular_price: 0,
  offer_price: 0,
  sizes: [],
  colors: [],
  images: [],
  description: "",
};

/**
 *
 * @param {{product: productType}}
 * @returns
 */
function InfoSection({ product }) {
  const [color, setColor] = useState(null);
  const [size, setSize] = useState(null);
  const { paymentMethods } = footerLists;

  return (
    <div className="md:w-[50%] w-full md:mt-0 mt-10 md:px-0 px-5">
      <div className="flex justify-between pb-2">
        <div className="flex gap-2">
          <div className="flex ">
            <Image src={StarFull} alt="star" className="w-4 h-4 " />
            <Image src={StarFull} alt="star" className="w-4 h-4" />
            <Image src={StarFull} alt="star" className="w-4 h-4" />
            <Image src={StarFull} alt="star" className="w-4 h-4" />
            <Image src={StarFull} alt="star" className="w-4 h-4" />
          </div>
          <p>1 customer review</p>
        </div>
        <p className="text-gray-400">SKU: ED1420</p>
      </div>
      <div>
        <WishList name={product?.name} id={product?.id} />

        {product?.quantity > 0 ? (
          <small className="text-[#59CF1F]">In Stock</small>
        ) : (
          <small className="text-red-500">Out of Stock</small>
        )}

        {/* color choose section */}
        <div className="mt-3">
          <h3 className="text-md">{product?.brand?.name}</h3>
          <div className="flex items-center flex-wrap gap-3 py-4">
            Color:
            {product?.colors?.map((item) => (
              <div
                key={item.id}
                onClick={() => setColor(item.name)}
                className={`border-[1px] hover:border-primary hover:text-primary text-gray-700 py-1 rounded-full text-center w-20 cursor-pointer ${
                  color === item.name && "border-primary text-primary"
                }`}
              >
                <p>{item.name}</p>
              </div>
            ))}
          </div>
          <h3 className="text-2xl text-primary">৳{product?.offer_price}</h3>
          <h4 className="text-md mt-3 text-gray-400">
            <span className="line-through">৳{product?.regular_price}</span> (
            {getDiscountPercentage(
              product?.regular_price,
              product?.offer_price
            )}
            %)
          </h4>
        </div>
        {/* size input field */}
        <div className="mt-5">
          <div className="text-2xl font-bold">
            Size:
            <Select
              defaultValue={product?.colors[0]?.name}
              className=""
              onValueChange={(V) => setSize(V)}
            >
              <SelectTrigger className="rounded-full py-2  w-[130px] border-primary bg-white outline-none focus: focus:ring-offset-white">
                <SelectValue placeholder="Select Size" />
              </SelectTrigger>
              <SelectContent>
                {product?.sizes?.map((item) => (
                  <SelectItem key={item.id} value={item.name}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
              {/* {product?.sizes?.map(item=>(
                                        <option key={item.id} value={item.name}>{item.name}</option>
                                    ))} */}
            </Select>
          </div>
        </div>
        {/* quantity input field & add & buy btn */}
        <Cart id={product?.id} color={color} product={product} size={size} />

        {/* payment option type  */}
        <div className="text-md text-gray-400 flex items-center gap-2">
          Payment:
          <div className="flex gap-2 flex-wrap">
            {paymentMethods.flatMap((item, index) => (
              <Image
                key={index}
                src={item}
                alt="index"
                className={`w-9 h-9 ${
                  index !== paymentMethods.length - 1 ? "" : ""
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoSection;
/**
 *
 * @param {{quantity:number,setQuantity:(value:number)=>void,product:productType,size:string,color:string}} param0
 * @returns
 */
const Cart = ({ product, size, color }) => {
  const router = useRouter();
  const { isAuth } = useAuth();
  // Fetching Carts
  const { data } = useGetCartsQuery(undefined, {
    skip: !isAuth,
  });

  // Cart ID

  // Adding Item TO Carts
  const [addToCart] = useAddToCartMutation();

  // Update Cart
  const [updateCart] = useUpdateCartMutation();

  // Existing cart id

  const [quantity, setQuantity] = useState(1);

  // Checking if Item Already Added TO Cart
  const [isExist, setIsExist] = useState(null);

  // Without Authentication Order Place
  const [singleOrderDialog, setSingleOrderDialog] = useState(false);
  const [dialogData, setDialogData] = useState({});
 
  // Without authentication, placing order
  const singleOrder = () => {
    setSingleOrderDialog(true);
    const data = {
        productId: product?.id,
        name: product?.name,
        brand: product?.brand?.name,
        storeId: product?.user?.id,
        storeName: product?.user?.name,
        size: size || product?.sizes[0]?.name,
        color: color || product?.colors[0]?.name,
        quantity: quantity,
        image: product?.images[0],
        regular_price: product?.regular_price,
        offer_price: product?.offer_price,
        price: product?.offer_price ? product?.offer_price * quantity : product?.regular_price * quantity
    }
    // console.log("Single Orderss Productsssss",data);
    setDialogData(data);
  }
  
   //Add To Cart
  const handleCart = useCallback(() => {
    if (!isAuth) {
      toast.error("You must login first, to add items on your cart");
      return;
    }
    if (!isExist) {
      const data = {
        productId: product?.id,
        size: size || product?.sizes[0]?.name,
        color: color || product?.colors[0]?.name,
        quantity: quantity,
      };
      // console.log("Add to Cart Data", data);
      addToCart(data);
    } else {
      if (isExist?.quantity < 5) {
        updateCart({
          id: isExist?.id,
          color: color || isExist.color,
          quantity: isExist.quantity + quantity,
          size: size || isExist.size,
        });
      } else {
        toast.error("Max quantity reached");
      }
    }
  }, [
    isAuth,
    isExist,
    product?.id,
    product?.sizes,
    product?.colors,
    size,
    color,
    quantity,
    addToCart,
    updateCart,
  ]);

  // Updating Existance of Cart Item
  useEffect(() => {
    const exist = data?.find((item) => item?.products?.id === product?.id);
    setIsExist(exist);
  }, [data, product]);
  return (
    <div className="my-5">
      <div className="text-2xl font-bold">
        Quantity:
        <div className="center w-[90%]">
          {/* quantity input field */}
          <QuantityInput
            quantity={quantity}
            setQuantity={setQuantity}
            productId={product?.id}
          />
          {/* add to cart button */}
          <Button
            onClick={handleCart}
            className="hover:bg-[#F85606]/50 text-md font-bold px-2 py-1 rounded-full"
          >
            Add to cart
          </Button>
          {/* buy btn */}
          <Button
            onClick={() => {
              // handleCart();
              // router.push("/checkout");
              isAuth ? (handleCart(), router.push("/checkout")) : singleOrder();
            }}
            className="hover:bg-[#F85606]/50 text-md font-bold px-3 py-1 rounded-full"
          >
            Buy Now
          </Button>
        </div>
      </div>
      <SingleOrderDialog singleOrderDialog={singleOrderDialog} data={dialogData}  setSingleOrderDialog={setSingleOrderDialog} />
    </div>
  );
};

/**
 *
 * @param {{name?:string,id?:string}}
 * @returns
 */
const WishList = ({ name, id }) => {
  const { isAuth } = useAuth();
  const { data } = useGetWishlistQuery(undefined, {
    skip: !isAuth,
  });
  const [setWishlist] = useAddToWishlistMutation();
  const [removeFromWishList] = useRemoveFromWishlistMutation();
  const [isExist, setIsExist] = useState(false);
  const addToWishList = useCallback(() => {
    if (!isAuth) {
      toast.error("You must login first, to add items on your wishlist");
      return;
    }
    if (isExist) {
      removeFromWishList(id);
      successMessage("Removed from wishlist");
      return;
    }
    setWishlist({
      productId: id,
    });
    successMessage("Added to wishlist");
  }, [id, setWishlist, isExist, removeFromWishList, isAuth]);
  // IS Exist
  useEffect(() => {
    const exist = data?.find((item) => item.id === id);
    if (exist) {
      setIsExist(!!exist);
    } else {
      setIsExist(false);
    }
  }, [id, data]);

  return (
    <div className="flex gap-3 ">
      <h1 className="text-2xl font-bold">{name}</h1>
      <div
        onClick={addToWishList}
        className={cn(
          "border-[1px] border-black hover:border-primary hover:text-primary z-30 rounded-full w-8 h-8 centerAll  cursor-pointer ",
          isExist ? "text-primary border-primary" : "text-black"
        )}
      >
        <BsHeart className=" " />
      </div>
    </div>
  );
};
