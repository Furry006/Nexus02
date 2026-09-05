ALTER TABLE "conversations" DROP CONSTRAINT "conversations_direct_user_one_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "conversations" DROP CONSTRAINT "conversations_direct_user_two_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "messages" DROP CONSTRAINT "messages_user_id_users_id_fk";
--> statement-breakpoint
DROP INDEX "conversations_direct_users_unique";--> statement-breakpoint
ALTER TABLE "conversations" ADD COLUMN "participants" uuid[];--> statement-breakpoint
ALTER TABLE "messages" ADD COLUMN "sender_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_sender_id_users_id_fk" FOREIGN KEY ("sender_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "conversations_direct_participants_unique" ON "conversations" USING btree ("participants");--> statement-breakpoint
ALTER TABLE "conversations" DROP COLUMN "direct_user_one_id";--> statement-breakpoint
ALTER TABLE "conversations" DROP COLUMN "direct_user_two_id";--> statement-breakpoint
ALTER TABLE "messages" DROP COLUMN "user_id";--> statement-breakpoint
ALTER TABLE "messages" DROP COLUMN "deleted_at";