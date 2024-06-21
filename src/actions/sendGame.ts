"use server";

import { ActionRowBuilder, ButtonBuilder, EmbedBuilder } from "@discordjs/builders";
import { REST } from "@discordjs/rest";
import { ButtonStyle, Routes } from "discord-api-types/v10";
import { ButtonId } from "./buttonId";

const ApproveButton = new ButtonBuilder()
  .setCustomId(ButtonId.GameApprove)
  .setLabel("Approve")
  .setStyle(ButtonStyle.Success);

const DeclineButton = new ButtonBuilder()
  .setCustomId(ButtonId.GameDecline)
  .setLabel("Decline")
  .setStyle(ButtonStyle.Danger);

export type GameFormData = {
  title: string;
  "thumbnail image": string;
  "build link": string;
  description: string;
  credits: string;
  media0: string | undefined;
  media1: string | undefined;
  media2: string | undefined;
  date: string;
  "theme(s)": string;
  "umn email": string;
};

export default async function sendGame(data: GameFormData) {
  const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_BOT_TOKEN!);
  const row = new ActionRowBuilder().addComponents(ApproveButton, DeclineButton);

  function checkUndefined(e: any) {
    return e ? e : "---";
  }

  try {
    const embed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle(data.title)
      .setDescription(checkUndefined(data.description))
      .addFields(
        { name: "Theme", value: checkUndefined(data["theme(s)"]), inline: true },
        { name: "Date", value: checkUndefined(data.date), inline: true },
        { name: "Credits", value: checkUndefined(data.credits) },
        { name: "Build Link", value: checkUndefined(data["build link"]) },
        { name: "Thumbnail Image", value: checkUndefined(data["thumbnail image"]) },
        { name: "Media 1", value: checkUndefined(data.media0), inline: true },
        { name: "Media 2", value: checkUndefined(data.media1), inline: true },
        { name: "Media 3", value: checkUndefined(data.media2), inline: true },
        { name: "Contact", value: `${data["umn email"]}`, inline: true }
      )
      .setTimestamp()
      .setImage(checkUndefined(data["thumbnail image"]))
      .setFooter({ text: "Pending Approval", iconURL: "https://i.imgur.com/VIWSXf3.png" });

    await rest.post(Routes.channelMessages(process.env.DISCORD_OFFICER_CHANNEL_ID!), {
      body: {
        embeds: [embed],
        components: [row],
      },
    });
    return { status: 200 };
  } catch (error) {
    console.error(error);
    return { status: 500 };
  }
}
