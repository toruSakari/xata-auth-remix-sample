import { createInsertSchema, createSelectSchema } from "drizzle-valibot";
import * as v from "valibot";
import { users } from "~/schema";

export const authOutputDto = v.pick(createSelectSchema(users), [
	"id",
	"email",
	"fullName",
	"avatar",
]);

export const authLoginInputDto = v.pick(
	createSelectSchema(users, {
		email: v.string([v.email()]),
	}),
	["email", "password"],
);

export type AuthLoginInputDto = v.Input<typeof authLoginInputDto>;

export const authSignupInputDto = v.pick(
	createInsertSchema(users, {
		email: v.string([v.email()]),
		password: v.string([v.minLength(8), v.maxLength(15)]),
		fullName: v.string([v.maxLength(100)]),
	}),
	["email", "fullName", "password"],
);

export type AuthSignupInputDto = v.Input<typeof authSignupInputDto>;
