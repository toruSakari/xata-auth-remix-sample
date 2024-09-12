import type { ActionFunctionArgs } from "@remix-run/node";
import { Form, json, useActionData } from "@remix-run/react";
import { type FormEvent, useState } from "react";
import * as v from "valibot";
import { HelperText } from "~/components/helper-text";
import { Button } from "~/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { authenticator } from "~/lib/authenticator";

const formSchema = v.object({
	fullName: v.string([
		v.minLength(1, "名前は必須です。"),
		v.maxLength(100, "名前は100文字以内で入力してください。"),
	]),
	email: v.string([v.email("メールアドレスの形式が異なります。")]),
	password: v.string([
		v.minLength(8, "パスワードは8文字以上で入力してください。"),
		v.maxLength(15, "パスワードは15文字以内で入力してください。"),
	]),
});

export default function Index() {
	const actionData = useActionData<typeof action>();

	const [issues, setIssues] = useState<v.FlatErrors<typeof formSchema>>({
		nested: {},
	});

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);

		const fullName = formData.get("full-name");

		const email = formData.get("email");

		const password = formData.get("password");

		const result = v.safeParse(formSchema, {
			fullName,
			email,
			password,
		});

		if (!result.success) {
			setIssues(v.flatten(result.issues));
			return;
		}

		e.currentTarget.submit();
	};

	return (
		<div className="h-full flex items-center justify-center">
			<Card className="w-[350px]">
				<CardHeader>
					<CardTitle>新規登録</CardTitle>
					<CardDescription>
						登録情報を入力してください。
						{actionData?.error && (
							<HelperText error={true}>{actionData?.error}</HelperText>
						)}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form
						method="post"
						id="signup"
						className="grid gap-3"
						onSubmit={handleSubmit}
					>
						<div className="grid w-full items-center gap-4">
							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="full-name">ユーザー名</Label>
								<Input
									id="full-name"
									name="full-name"
									placeholder="ログイン太郎"
								/>
								{issues.nested.fullName?.map((issue) => (
									<HelperText key={issue} error={true}>
										{issue}
									</HelperText>
								))}
							</div>
						</div>
						<div className="grid w-full items-center gap-4">
							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="email">メールアドレス</Label>
								<Input
									id="email"
									name="email"
									type="email"
									placeholder="text@example.com"
								/>
								{issues.nested.email?.map((issue) => (
									<HelperText key={issue} error={true}>
										{issue}
									</HelperText>
								))}
							</div>
						</div>
						<div className="grid w-full items-center gap-4">
							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="password">パスワード</Label>
								<Input id="password" name="password" type="password" />
								{issues.nested.password?.map((issue) => (
									<HelperText key={issue} error={true}>
										{issue}
									</HelperText>
								))}
							</div>
						</div>
					</Form>
				</CardContent>
				<CardFooter className="flex justify-between">
					<Button type="reset" form="signup" variant="outline">
						クリア
					</Button>
					<Button type="submit" form="signup">
						登録
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}

export function meta() {
	return [
		{ title: "新規登録" },
		{ name: "description", content: "新規登録画面" },
	];
}

export async function action({ request }: ActionFunctionArgs) {
	try {
		return await authenticator.authenticate("signup", request, {
			successRedirect: "/",
		});
	} catch (error) {
		if (error instanceof Response) {
			return error;
		}

		if (error instanceof Error) {
			return json({ error: error.message }, { status: 401 });
		}

		return json({ error: "認証に失敗しました" }, { status: 401 });
	}
}
