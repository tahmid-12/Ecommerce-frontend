
import { Input } from "../ui/input";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";


function CustomTextInput({ form, name, type, placeholder, label, style, isDisable, disable, isDate }) {
  return (
    <FormField control={form.control} name={name} render={({ field }) => (
      <FormItem className="w-full">
        {label && <FormLabel className="text-md">{label}</FormLabel>}
        <FormControl>
          <Input
            {...field}
            disabled={isDisable || disable}
            className={`${style} ${isDate ? "h-[50px]" : "py-6"}`}
            type={type}
            placeholder={placeholder}
          />
        </FormControl>
        <FormMessage className="text-md px-5" />
      </FormItem>
    )}/>
  );
}

export default CustomTextInput;
