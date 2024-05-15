"use server";

import { ContactData } from "@/app/contact/FormWrapper";
import { REST } from "@discordjs/rest";
import { ButtonStyle, Routes } from "discord-api-types/v10";
import { ActionRowBuilder, ButtonBuilder, EmbedBuilder } from "@discordjs/builders"
import { ButtonId } from "./buttonId";

const ApproveButton = new ButtonBuilder()
  .setCustomId(ButtonId.GameApprove)
  .setLabel("Approve")
  .setStyle(ButtonStyle.Success);

const DeclineButton = new ButtonBuilder()
  .setCustomId(ButtonId.GameDecline)
  .setLabel("Decline")
  .setStyle(ButtonStyle.Danger);

export default async function sendMessage(data: ContactData) {
  const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_BOT_TOKEN!);
  const row = new ActionRowBuilder().addComponents(ApproveButton, DeclineButton);

  const embed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle(data.subject)
    .setAuthor({ name: `By: ${data.name}` })
    .setDescription(data.message)
    .addFields({ name: "Email", value: data.email })
    .setTimestamp()
    .setFooter({ text: "Pending Approval", iconURL: "https://i.imgur.com/VIWSXf3.png" });

  try {
    await rest.post(Routes.channelMessages(process.env.DISCORD_OFFICER_CHANNEL_ID!), {
      body: {
        embeds: [embed],
        components: [row],
      },
    });
  } catch (error) {
    console.error(error);
  }
}
