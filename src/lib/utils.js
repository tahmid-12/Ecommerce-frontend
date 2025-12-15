import { Client } from "@googlemaps/google-maps-services-js";
import { AxiosError } from "axios";
import { clsx } from "clsx";
import { createDecipher } from "crypto";
import { toast } from "react-hot-toast";
import { twMerge } from "tailwind-merge";

const getLocation = async (lat, long) => {
  const client = new Client();
  const { data } = await client.elevation({
    params: { locations: [{ latitude: lat, longitude: long }] },
  });
  console.log(data);
};

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * @param {AxiosError} err
 */
export const errorMessage = (err) => {
  if (err?.response?.data?.message) {
    toast.error(err?.response?.data?.message);
  }
};

/**
 * @param {string} message
 */

export const successMessage = (message) => {
  toast.success(message);
};

/**
 * @param {Array}carts
 */

export const groupCartByShop = (carts) => {
  const map = {};

  if (!carts?.length) {
    return [];
  }

  // Iterate through each cart
  carts.forEach((cart) => {
    const shopName = cart.products?.user?.shopName || "Darkak";
    const shopLocation = cart.products?.user?.warehouseAddress?.district;

    // Check if the shop has already been encountered
    if (map[shopName]) {
      // If yes, add the cart item to the existing shop's cart_items array
      map[shopName].cart_items.push(cart);
    } else {
      // If not, create a new entry in the map for the shop
      map[shopName] = {
        shop: shopName,
        cart_items: [cart],
        shopLocation,
      };
    }
  });
  return Object.values(map);
};

export const getDiscountPercentage = (regularPrice, offerPrice) => {
  const difference = regularPrice - offerPrice;
  const percentage = (difference / regularPrice) * 100;
  return Math.round(percentage);
};

export const getPercentage = (num1, num2) => {
  return ((num1 / num2) * 100).toFixed(2);
};

export const decrypt = (encryptedText, key = "darkak") => {
  const decipher = createDecipher("aes-256-cbc", key);
  let decrypted = decipher.update(encryptedText, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};

/**
 *
 * @param {{id:number,coverage:string,coverage_id:string,shipping_charge?:number}[]} packages
 * @param {string} seller_district
 * @param {string} customer_district
 */
export const filterPackages = (
  packages,
  seller_district,
  customer_district
) => {
  if (
    customer_district?.toLowerCase() === "dhaka" &&
    seller_district?.toLowerCase() === "dhaka"
  ) {
    return packages?.filter(
      (item) => item.coverage_id == "Inside Dhaka" && !!item.shipping_charge
    );
  } else {
    return packages?.filter(
      (item) => item.coverage_id == "Outside Dhaka" && !!item.shipping_charge
    );
  }
};

const getLocationDataFromBrowser = async (cb) => {
  navigator.geolocation.watchPosition((position) => {
    cb(position.coords.latitude, position.coords.longitude);
  });
};
