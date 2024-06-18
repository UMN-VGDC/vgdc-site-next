import { REST } from "@discordjs/rest";
import {
  APIBaseInteraction,
  APIButtonComponentWithCustomId,
  APIEmbed,
  InteractionType,
  Routes,
} from "discord-api-types/v10";
import { revalidateTag } from "next/cache";

export async function sendGameToSpreadsheet(
  interaction: APIBaseInteraction<InteractionType.MessageComponent, APIButtonComponentWithCustomId>,
  embed: APIEmbed
) {
  if (!interaction.channel?.id || !interaction.message?.id) return;

  //revalidates the cache for the games page, so the new data can be fetched immediately
  revalidateTag("games");

  const data = { ...embed, spreadsheet: "addGames" };
  try {
    await fetch(process.env.SPREADSHEET_ENDPOINT_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(data),
    });

    const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_BOT_TOKEN!);
    await rest.patch(Routes.channelMessage(interaction.channel?.id, interaction.message?.id), {
      body: {
        embeds: [embed],
        components: [],
      },
    });
  } catch (err) {
    console.error(err);
  }
}
