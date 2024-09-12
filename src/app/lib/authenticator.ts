import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { sessionStorage } from "~/lib/session";
import type { User } from "~/schema";
import { authService } from "~/services/auth.service";

export const authenticator = new Authenticator<Omit<User, "password">>(
	sessionStorage,
	{
		throwOnError: true,
	},
);

authenticator.use(
	new FormStrategy(async ({ form }) => {
		const email = form.get("email") as string;
		const password = form.get("password") as string;

		const user = await authService.login({ email, password });

		return user;
	}),
	"login",
);

authenticator.use(
	new FormStrategy(async ({ form }) => {
		const email = form.get("email") as string;
		const password = form.get("password") as string;
		const fullName = form.get("full-name") as string;

		const user = await authService.signup({
			email,
			password,
			fullName,
		});

		return user;
	}),
	"signup",
);
