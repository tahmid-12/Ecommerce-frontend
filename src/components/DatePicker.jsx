"use client";
import * as React from "react";
import {CalendarIcon} from "@radix-ui/react-icons";
import {format} from "date-fns";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {Calendar} from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form";
import {Input} from "@/components/ui/input";

function DatePicker({form, name, label = "Date of birth"}) {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({field}) => {
                const value = field?.value ? format(field?.value, "yyyy-MM-dd") : undefined
                return (
                    <FormItem className="flex flex-col w-full">
                        <FormLabel className="text-md">{label}</FormLabel>
                        <FormControl>
                            <Input
                                {...field}
                                value={value}
                                type={"date"}
                                className={'profileInput h-[50px]'}
                            />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                );
            }}
        />
    );
}

/**
 *
 * @param {{form:import("react-hook-form").UseFormReturn,name:string}}
 * @returns
 */
export default React.memo(DatePicker);
