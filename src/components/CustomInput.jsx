import { Checkbox } from "./ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";

function CustomInput({
  style,
  form,
  name,
  type,
  placeholder,
  isCheckBox,
  isLabel,
  isSelector,
  isTextArea,
  isDisable,
  disable,
  isFixWidth,
  isDate,
    label
}) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem
            className={`${isFixWidth ? " md:max-w-[250px] w-full lg:max-w-full" : "w-full"}`}
          >
            {isLabel && (
              <FormLabel className="text-md">{label?label:placeholder}</FormLabel>
            )}
            <div className={`${isCheckBox && "flex gap-2"} w-full`}>
              {isSelector ? (
                <Select
                  disabled={isDisable}
                  onValueChange={field.onChange}
                  value={field.value}
                  className=""
                >
                  <FormControl>
                    <SelectTrigger className="bg-transparent py-6 text-md text-gray-500   border-gray-200 disabled:border-slate-400  ">
                      <SelectValue placeholder="Select your gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              ) : isTextArea ? (
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder={placeholder}
                    className={style}
                  />
                </FormControl>
              ) : (
                <FormControl>
                  {!isCheckBox ? (
                    <Input
                      {...field}
                      disabled={isDisable || disable}
                      className={`${style} ${isDate ? "h-[50px]" : "py-6"}`}
                      type={type}
                      placeholder={placeholder}
                    />
                  ) : (
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="mt-[2px]"
                    />
                  )}
                </FormControl>
              )}

              {isCheckBox && (
                <FormLabel className="text-md  text-gray-500">
                  {placeholder}
                </FormLabel>
              )}
            </div>
            {<FormMessage className="text-md px-5" />}
          </FormItem>
        );
      }}
    />
  );
}

export default CustomInput;
