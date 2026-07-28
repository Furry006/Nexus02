ALTER TABLE "workspaces" ADD COLUMN "invite-code" varchar(10) NOT NULL;--> statement-breakpoint
ALTER TABLE "workspaces" ADD CONSTRAINT "workspaces_invite-code_unique" UNIQUE("invite-code");