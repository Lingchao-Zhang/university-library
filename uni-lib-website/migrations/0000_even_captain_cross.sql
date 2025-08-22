CREATE TYPE "public"."roles" AS ENUM('User', 'Admin');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('Pending', 'Approved', 'Rejected');--> statement-breakpoint
CREATE TABLE "users_table" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"full_name" varchar(256) NOT NULL,
	"email" varchar NOT NULL,
	"university_id" integer NOT NULL,
	"password" varchar(20) NOT NULL,
	"university_card" text NOT NULL,
	"status" "status" DEFAULT 'Pending',
	"role" "roles" DEFAULT 'User',
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"last_activity_time" timestamp NOT NULL,
	CONSTRAINT "users_table_id_unique" UNIQUE("id"),
	CONSTRAINT "users_table_university_id_unique" UNIQUE("university_id")
);
