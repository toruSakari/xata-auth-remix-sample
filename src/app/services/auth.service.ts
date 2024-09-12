import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { AuthorizationError } from "remix-auth";
import * as v from "valibot";
import db from "~/database";
import {
	authLoginInputDto,
	authOutputDto,
	authSignupInputDto,
} from "~/dtos/auth.dto";
import type { AuthLoginInputDto, AuthSignupInputDto } from "~/dtos/auth.dto";
import { users } from "~/schema";

const SALT = 10;

export const authService = {
	async login(input: AuthLoginInputDto) {
		const inputDto = v.parse(authLoginInputDto, input);

		const user = await db.query.users.findFirst({
			where: eq(users.email, inputDto.email),
		});

		if (!user?.password) {
			throw new AuthorizationError(
				"メールアドレスまたはパスワードが異なります。",
			);
		}

		const isMatchedPassword = bcrypt.compareSync(
			inputDto.password,
			user.password,
		);

		if (!isMatchedPassword) {
			throw new AuthorizationError(
				"メールアドレスまたはパスワードが異なります。",
			);
		}

		const outputDto = v.parse(authOutputDto, user);

		return outputDto;
	},

	async signup(input: AuthSignupInputDto) {
		const inputDto = v.parse(authSignupInputDto, input);

		const user = await db.query.users.findFirst({
			where: eq(users.email, inputDto.email),
		});

		if (user) {
			throw new AuthorizationError("既に存在するメールアドレスです");
		}

		const hashedPassword = bcrypt.hashSync(input.password, SALT);

		const [createdUser] = await db
			.insert(users)
			.values({
				...inputDto,
				password: hashedPassword,
			})
			.returning();

		const outputDto = v.parse(authOutputDto, createdUser);

		return outputDto;
	},
};
