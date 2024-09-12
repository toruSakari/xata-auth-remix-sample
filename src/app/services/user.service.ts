import { eq } from "drizzle-orm";
import * as v from "valibot";
import db from "~/database";
import { userGetUserPostsInputDto } from "~/dtos/user.dto";
import type { UserGetUserPostsInputDto } from "~/dtos/user.dto";
import { users } from "~/schema";

const userService = {
	getAll() {
		return db.query.users.findMany({
			columns: {
				id: true,
				fullName: true,
				avatar: true,
			},
			with: {
				posts: true,
			},
		});
	},

	getUserPosts(input: UserGetUserPostsInputDto) {
		const inputDto = v.parse(userGetUserPostsInputDto, input);

		return db.query.users.findFirst({
			columns: {
				id: true,
				fullName: true,
				avatar: true,
			},
			where: eq(users.id, inputDto.id),
			with: {
				posts: true,
			},
		});
	},
};
