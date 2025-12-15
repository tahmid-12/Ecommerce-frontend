import { MobileNav } from "@/components";
import { CartList } from "@/components/AddToCart/CartList";
import TableFooter from "@/components/AddToCart/TableFooter";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function CartPage() {
  return (
    <>
      <MobileNav title={"Cart"} link={"/"} />
      <Card className="bg-white  border-none shadow-5xl rounded-2xl md:mt-10 mb-10 mt-16">
        {/* title */}
        <CardHeader>
          <CardTitle>Shopping Cart</CardTitle>
        </CardHeader>
        <CardContent>
          <CartList />
        </CardContent>
        <CardFooter>
          <TableFooter />
        </CardFooter>
      </Card>
    </>
  );
}

export default CartPage;
