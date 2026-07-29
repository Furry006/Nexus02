ALTER TABLE "workspaces" RENAME COLUMN "invite-code" TO "invite_code";--> statement-breakpoint
ALTER TABLE "workspaces" DROP CONSTRAINT "workspaces_invite-code_unique";--> statement-breakpoint
ALTER TABLE "workspaces" ADD CONSTRAINT "workspaces_invite_code_unique" UNIQUE("invite_code");