CREATE TABLE IF NOT EXISTS "posts" (
	"id" text NOT NULL,
	"detail" text NOT NULL,
	"title" text NOT NULL,
	"xata_created_at" timestamp with time zone DEFAULT now(),
	"xata_updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"full_name" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"avatar" text,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
