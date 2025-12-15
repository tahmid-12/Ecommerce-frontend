import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";

function CustomSelector({ form, name, label, isDisable, placeholder, options = [] }) {
	return (
		<FormField control={form.control} name={name} render={({ field }) => (
			<FormItem className="w-full">
				{label && <FormLabel className="text-md">{label}</FormLabel>}
				<Select disabled={isDisable} onValueChange={field.onChange} value={field.value}>
					<FormControl>
						<SelectTrigger className="bg-transparent py-6 text-md text-gray-500 border-gray-200 disabled:border-slate-400">
							<SelectValue placeholder={placeholder || "Select an option"} />
						</SelectTrigger>
					</FormControl>
					<SelectContent>
						{options?.map((option, index) => (
							<SelectItem key={index} value={option?.value}>
								{option?.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				<FormMessage className="text-md px-5" />
			</FormItem>
		)} />
	);
}

export default CustomSelector;
