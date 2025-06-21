/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as auth from "../auth.js";
import type * as connections_functions from "../connections/functions.js";
import type * as connections_mutations from "../connections/mutations.js";
import type * as connections_queries from "../connections/queries.js";
import type * as helper from "../helper.js";
import type * as http from "../http.js";
import type * as profile_mutations from "../profile/mutations.js";
import type * as profile_profileSearch from "../profile/profileSearch.js";
import type * as profile_queries from "../profile/queries.js";
import type * as startups_mutations from "../startups/mutations.js";
import type * as startups_startupSearch from "../startups/startupSearch.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  auth: typeof auth;
  "connections/functions": typeof connections_functions;
  "connections/mutations": typeof connections_mutations;
  "connections/queries": typeof connections_queries;
  helper: typeof helper;
  http: typeof http;
  "profile/mutations": typeof profile_mutations;
  "profile/profileSearch": typeof profile_profileSearch;
  "profile/queries": typeof profile_queries;
  "startups/mutations": typeof startups_mutations;
  "startups/startupSearch": typeof startups_startupSearch;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
