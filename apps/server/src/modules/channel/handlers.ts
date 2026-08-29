import type { AppRouteHandler } from "#/openapi/index.js";
import type {
  CreateChannelRoute,
  DeleteChannelRoute,
  GetWorkspaceChannel,
  UpdateChannelRoute,
} from "./routes.js";
import { HttpResponse, HttpStatus, HttpError } from "#/utils/http/index.js";
import {
  createChannel,
  deleteChannel,
  getWorkspaceChannels,
  updateChannel,
} from "./services.js";

export const createChannelHandler: AppRouteHandler<CreateChannelRoute> = async (ctx) => {
  const user = ctx.get("user");
  console.log("user from ctx:", user);
  if (!user) {
    throw new HttpError(
      HttpStatus.UNAUTHORIZED,
      "Unauthorized",
    );
  }
  const { workspaceId } = ctx.req.valid("param");
  const body = ctx.req.valid("json");

  const channel = await createChannel({
    workspaceId,
    userId: user["id"] as string,
    ...body,
  });

  return HttpResponse.success(
    ctx,
    HttpStatus.CREATED,
    "Channel Created Successfully",
    channel,
  );
};

export const getWorkspaceChannelHandler: AppRouteHandler<GetWorkspaceChannel> = async (ctx) => {
  const { workspaceId } = ctx.req.valid("param");
  const user = ctx.get("user");
  if (!user) {
    throw new HttpError(
      HttpStatus.UNAUTHORIZED,
      "Unauthorized",
    );
  }

  const channels = await getWorkspaceChannels({
    workspaceId,
    userId: user["id"] as string,
  })

  return HttpResponse.success(
    ctx,
    HttpStatus.OK,
    "Channels Fetched Successfully",
    channels,
  );
}

export const updateChannelHandler : AppRouteHandler<UpdateChannelRoute> = async (ctx) => {
  const {workspaceId, channelId} = ctx.req.valid("param")

  const body = ctx.req.valid("json")

  const user = ctx.get("user");
  if (!user) {
    throw new HttpError(
      HttpStatus.UNAUTHORIZED,
      "Unauthorized",
    );
  }

  const channel = await updateChannel({
    workspaceId,
    channelId,
    userId: user["id"] as string,
    ...body,
  });

  return HttpResponse.success(
    ctx,
    HttpStatus.OK,
    "Channel updated successfully",
    channel,
  );
};

export const deleteChannelHandler: AppRouteHandler<DeleteChannelRoute> = async (ctx) => {
  const { workspaceId, channelId } = ctx.req.valid("param");

  const user = ctx.get("user");

  const deletedChannel = await deleteChannel({
    workspaceId,
    channelId,
    userId: user["id"] as string,
  });

  return HttpResponse.success(
    ctx,
    HttpStatus.OK,
    "Channel Deleted Successfully",
    deletedChannel,
  );
};
