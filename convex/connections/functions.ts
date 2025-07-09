import type { Id } from "../_generated/dataModel";
import type { QueryCtx, MutationCtx } from "../_generated/server";

export async function getProfileByIdfn(
  ctx: QueryCtx | MutationCtx,
  id: Id<"profiles">,
) {
  return await ctx.db.get(id);
}
