"use client";
import Image from "next/image";
import {IoClose} from "react-icons/io5";
import QuantityInput from "../QuantityInput";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "../ui/table";
import * as React from "react";
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {useGetCartsQuery, useRemoveFromCartMutation} from "@/redux/api/cart";


const columns = [
    {
        accessorKey: "product",
        header: "Product",
        cell: ({row}) => {
            return (
                <div className="flex gap-2 items-center w-[300px]">
                    <Image
                        src={`${process.env.NEXT_PUBLIC_IMAGE_API}${row.original.products?.images[0]?.path}`}
                        alt="cloth"
                        width={100}
                        height={100}
                        className="w-16 h-16 rounded-full object-contain"
                    />
                    <div>
                        <h1 className="text-md">{row.original.products?.name}</h1>
                        <p className="text-[16px] text-gray-400">
                            {row.original.products?.id}
                        </p>
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: "color",
        header: <div className="text-right">Color</div>,
        cell: ({row}) => <div className="text-right">{row.original?.color}</div>,
    },
    {
        accessorKey: "size",
        header: <div className="text-right">Size</div>,
        cell: ({row}) => <div className="text-right">{row.original?.size}</div>,
    },
    {
        accessorKey: "amount",
        header: <div className="text-center">QTY</div>,
        cell: ({row}) => (
            <div className="flex justify-center ">
                <QuantityInput
                    quantity={row.original?.quantity}
                    productId={row.original?.products?.id}
                />
            </div>
        ),
    },
    {
        accessorKey: "price",
        header: () => <div className="text-right w-[80px]">Price</div>,
        cell: ({row}) => {
            // Format the price as a dollar price
            const formatted =
                "৳ " + row.original.products?.offer_price * row.original.quantity;

            return <div className="text-right font-medium w-[80px]">{formatted}</div>;
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({row}) => {
            return <RemoveFromCart id={row.original.id}/>;
        },
    },
];

const RemoveFromCart = ({id}) => {
    const [removeFromCart] = useRemoveFromCartMutation();
    return (
        <div className=" flex justify-end">
            <IoClose
                onClick={() => removeFromCart(id)}
                className="text-primary text-xl cursor-pointer"
            />
        </div>
    );
};

export function CartList() {
    const [sorting, setSorting] = React.useState([]);
    const [columnFilters, setColumnFilters] = React.useState([]);
    const [columnVisibility, setColumnVisibility] = React.useState({});
    const [rowSelection, setRowSelection] = React.useState({});
    const {data, isLoading} = useGetCartsQuery();

    const table = useReactTable({
        data: isLoading ? [] : data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    return (
        <div className="w-full">
            <div className="">
                <Table className="w-full">
                    <TableHeader className="text-md font-bold">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className="border-none">
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody className="text-[16px]">
                        {table?.getRowModel()?.rows?.length ? (
                            table?.getRowModel()?.rows?.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className="border-none"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
