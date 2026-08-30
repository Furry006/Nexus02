CREATE TYPE "public"."conversation_type" AS ENUM('channel', 'direct');--> statement-breakpoint
CREATE TABLE "conversations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" "conversation_type" NOT NULL,
	"channel_id" uuid,
	"direct_user_one_id" uuid,
	"direct_user_two_id" uuid,
	"last_interaction_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "messages" DROP CONSTRAINT "messages_channel_id_channels_id_fk";
--> statement-breakpoint
DROP INDEX "messages_channel_created_at_idx";--> statement-breakpoint
ALTER TABLE "messages" ADD COLUMN "conversation_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_channel_id_channels_id_fk" FOREIGN KEY ("channel_id") REFERENCES "public"."channels"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_direct_user_one_id_users_id_fk" FOREIGN KEY ("direct_user_one_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_direct_user_two_id_users_id_fk" FOREIGN KEY ("direct_user_two_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "conversations_channel_unique" ON "conversations" USING btree ("channel_id");--> statement-breakpoint
CREATE UNIQUE INDEX "conversations_direct_users_unique" ON "conversations" USING btree ("direct_user_one_id","direct_user_two_id");--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_conversation_id_conversations_id_fk" FOREIGN KEY ("conversation_id") REFERENCES "public"."conversations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "messages_conversation_created_at_idx" ON "messages" USING btree ("conversation_id","created_at");--> statement-breakpoint
ALTER TABLE "messages" DROP COLUMN "channel_id";