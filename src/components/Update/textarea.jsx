import { Textarea } from "./ui/textarea";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";

function CustomTextarea({ form, name, label, placeholder, style }) {
	return (
		<FormField control={form.control} name={name} render={({ field }) => (
			<FormItem className="w-full">
				{label && <FormLabel className="text-md">{label}</FormLabel>}
				<FormControl>
					<Textarea {...field} placeholder={placeholder} className={style} />
				</FormControl>
				<FormMessage className="text-md px-5" />
			</FormItem>
		)} />
	);
}

export default CustomTextarea;
