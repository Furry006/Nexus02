import { db } from "#/db/index.js";
import { workspaceMembers, workspaces } from "#/db/schemas/index.js";
import { generateInviteCode } from "#/utils/helpers.js";

type CreateWorkspaceInput = {
  ownerId: string;
  name: string;
  description?: string;
};

export const createWorkspace = async ({
  ownerId,
  name,
  description,
}: CreateWorkspaceInput) => {
  return await db.transaction(async (c) => {
    const insertedWorkspaces = await c
      .insert(workspaces)
      .values({ name, description, ownerId, inviteCode: generateInviteCode() })
      .returning();

    const workspace = insertedWorkspaces[0];
    if (!workspace) {
      throw new Error("Failed to create workspace");
    }

    await c.insert(workspaceMembers).values({
      workspaceId: workspace.id,
      userId: ownerId,
      role: "owner",
    });

    return workspace;
  });
};
