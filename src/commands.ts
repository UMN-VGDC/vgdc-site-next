/**
 * Share command metadata from a common spot to be used for both runtime
 * and registration.
 *
 * @see https://discord.com/developers/docs/interactions/application-commands#registering-a-command
 */

import {
  APIApplicationCommand,
  ApplicationCommandOptionType,
  ApplicationCommandType,
  PermissionFlagsBits,
} from "discord-api-types/v10";

const PING_COMMAND = {
  name: "ping",
  description: "Ping pong! I'll respond with pong.",
} as APIApplicationCommand;

const INVITE_COMMAND = {
  name: "invite",
  description: "Get an invite link to add this bot to your server",
} as APIApplicationCommand;

export enum AnnouncementType {
  Schedule = "Schedule",
  Themes = "Themes",
  GameJam = "Game Jam",
  Event = "Event",
  Other = "Other"
}

const ANNOUNCEMENT_COMMAND = {
  name: "announcement",
  description: "Make an announcement",
  options: [
    {
      name: "category",
      description: "What is this announcement about?",
      type: ApplicationCommandType.Message,
      required: true,
      choices: [
        { name: AnnouncementType.Schedule, value: "schedule" },
        { name: AnnouncementType.Themes, value: "themes" },
        { name: AnnouncementType.GameJam, value: "game jam" },
        { name: AnnouncementType.Event, value: "event" },
        { name: AnnouncementType.Other, value: "other" },
      ],
    },
    {
      name: "tag-everyone",
      description: "@everyone?",
      required: true,
      type: ApplicationCommandOptionType.Boolean,
    },
  ],
  default_member_permissions: PermissionFlagsBits.Administrator.toString(),
} as APIApplicationCommand;

export const commands = {
  ping: PING_COMMAND,
  invite: INVITE_COMMAND,
  announcement: ANNOUNCEMENT_COMMAND,
} as const;
