import { Checkbox } from "./ui/checkbox";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";

function CustomCheckbox({ form, name, label }) {
  return (
    <FormField control={form.control} name={name} render={({ field }) => (
      <FormItem className="flex gap-2 w-full">
        <FormControl>
          <Checkbox checked={field.value} onCheckedChange={field.onChange} className="mt-[2px]" />
        </FormControl>
        <FormLabel className="text-md text-gray-500">{label}</FormLabel>
        <FormMessage className="text-md px-5" />
      </FormItem>
    )}/>
  );
}

export default CustomCheckbox;
