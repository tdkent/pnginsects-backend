export enum AcceptedParams {
  blattodea = "blattodea",
  butterflies = "butterflies",
  coleoptera = "coleoptera",
  damselflies = "damselflies",
  diptera = "diptera",
  dragonfiles = "dragonflies",
  hemiptera = "hemiptera",
  home = "home",
  hymenoptera = "hymenoptera",
  mantodea = "mantodea",
  moths = "moths",
  orthoptera = "orthoptera",
  phasmida = "phasmida",
  trichoptera = "trichoptera",
}

export interface CloudinaryResource {
  asset_id: string;
  public_id: string;
  format: string;
  version: number;
  resource_type: "upload";
  created_at: string;
  bytes: number;
  width: number;
  height: number;
  folder: string;
  url: string;
  secure_url: string;
}

export interface CloudinaryResources {
  resources: CloudinaryResource[];
  rate_limit_allowed: number;
  rate_limit_reset_at: Date;
  rate_limit_remaining: number;
}

export enum Errors {
  notfoundError = "That route does not exist",
  requestError = "Received invalid request parameters",
  serverError = "An unknown error occurred while processing the request.",
}
