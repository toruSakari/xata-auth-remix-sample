import { createSelectSchema } from "drizzle-valibot";
import * as v from "valibot";
import { users } from "~/schema";

export const userGetUserPostsInputDto = v.pick(createSelectSchema(users), [
	"id",
]);

export type UserGetUserPostsInputDto = v.Input<typeof userGetUserPostsInputDto>;
