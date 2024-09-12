import * as React from "react";
import { tv } from "tailwind-variants";
import { cn } from "~/lib/utils";

const helperText = tv({
	base: "text-xs",
	variants: {
		error: {
			true: "text-red-500",
		},
	},
});

type Props = {
	error?: boolean;
} & React.ComponentProps<"p">;

export const HelperText = React.forwardRef<HTMLParagraphElement, Props>(
	({ className, children, error, ...props }, ref) => (
		<p className={cn(helperText({ error }), className)} {...props} ref={ref}>
			{children}
		</p>
	),
);
