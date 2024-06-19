import { ButtonId } from "@/actions/buttonId";
import { commands } from "@/commands";
import { verifyInteractionRequest } from "@/discord/verify-incoming-request";
import { env } from "@/env.mjs";
import {
  APIApplicationCommandInteractionDataBasicOption,
  APIEmbed,
  InteractionResponseType,
  InteractionType,
  MessageFlags,
} from "discord-api-types/v10";
import { NextResponse } from "next/server";
import { announcementModal } from "./announcementModal";
import { sendGameToSpreadsheet } from "./sendGameToSpreadsheet";
import { sendAnnouncement } from "./sendAnnouncement";

/**
 * Use edge runtime which is faster, cheaper, and has no cold-boot.
 * If you want to use node runtime, you can change this to `node`, but you'll also have to polyfill fetch (and maybe other things).
 *
 * @see https://nextjs.org/docs/app/building-your-application/rendering/edge-and-nodejs-runtimes
 */
export const runtime = "edge";

const ROOT_URL = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : env.ROOT_URL;

/**
 * Handle Discord interactions. Discord will send interactions to this endpoint.
 *
 * @see https://discord.com/developers/docs/interactions/receiving-and-responding#receiving-an-interaction
 */
export async function POST(request: Request) {
  const verifyResult = await verifyInteractionRequest(request, env.DISCORD_APP_PUBLIC_KEY);
  if (!verifyResult.isValid || !verifyResult.interaction) {
    return new NextResponse("Invalid request", { status: 401 });
  }
  const { interaction } = verifyResult;

  if (interaction.type === InteractionType.Ping) {
    // The `PING` message is used during the initial webhook handshake, and is
    // required to configure the webhook in the developer portal.
    return NextResponse.json({ type: InteractionResponseType.Pong });
  }

  if (interaction.type === InteractionType.ApplicationCommand) {
    const { name } = interaction.data;
    switch (name) {
      case commands.ping.name:
        return NextResponse.json({
          type: InteractionResponseType.ChannelMessageWithSource,
          data: { content: `Pong` },
        });

      case commands.invite.name:
        return NextResponse.json({
          type: InteractionResponseType.ChannelMessageWithSource,
          data: {
            content: `Click this link to add NextBot to your server: https://discord.com/api/oauth2/authorize?client_id=${env.DISCORD_APP_ID}&permissions=2147485696&scope=bot%20applications.commands`,
            flags: MessageFlags.Ephemeral,
          },
        });

      case commands.announcement.name:
        const { options } = interaction.data;
        if (!options) {
          return new NextResponse("Invalid request", { status: 400 });
        }
        return NextResponse.json({
          type: InteractionResponseType.Modal,
          data: announcementModal(options as APIApplicationCommandInteractionDataBasicOption[]),
        });
      default:
      // Pass through, return error at end of function
    }
  }

  if (interaction.type === InteractionType.ModalSubmit) {
    //@ts-ignore
    const params = JSON.parse(interaction.data.custom_id)

    if (params.type === "announcement") {
      const res = await sendAnnouncement(interaction, params.category, params.tagEveryone)
      return NextResponse.json({
        type: InteractionResponseType.ChannelMessageWithSource,
        data: { content: res.status === 200 ? `Announcement Sent!` : res.message },
      });
    }
  }

  if (interaction.type === InteractionType.MessageComponent && interaction.message) {
    const embed = interaction.message.embeds[0];

    const success = (embed: APIEmbed) => {
      return NextResponse.json({
        type: InteractionResponseType.UpdateMessage,
        data: { content: `<@${interaction.member?.user?.id}>`, embeds: [embed], components: [] },
      });
    };

    switch (interaction.data!.custom_id) {
      case ButtonId.ContactReply:
        embed.footer!.text = `Replied by ${interaction.member?.user?.global_name}`;
        embed.color = 5763719;
        embed.footer!.icon_url = "https://i.imgur.com/slN10y7.png";
        return success(embed);

      case ButtonId.ContactSpam:
        embed.footer!.text = `Marked as spam by ${interaction.member?.user?.global_name}`;
        embed.color = 15548997;
        embed.footer!.icon_url = "https://i.imgur.com/ouFkKRh.png";
        return success(embed);

      case ButtonId.GameApprove:
        embed.footer!.text = `Game approved by ${interaction.member?.user?.global_name}`;
        embed.color = 5763719;
        embed.footer!.icon_url = "https://i.imgur.com/slN10y7.png";

        sendGameToSpreadsheet(interaction, embed);
        return NextResponse.json({
          type: InteractionResponseType.DeferredMessageUpdate,
        });

      case ButtonId.GameDecline:
        embed.footer!.text = `Game declined by ${interaction.member?.user?.global_name}`;
        embed.color = 15548997;
        embed.footer!.icon_url = "https://i.imgur.com/ouFkKRh.png";
        return success(embed);
      default:
    }
  }

  return new NextResponse("Unknown command", { status: 400 });
}
