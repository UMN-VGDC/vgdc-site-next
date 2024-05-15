"use server";

import { ContactData } from "@/app/contact/FormWrapper";
import { ActionRowBuilder, ButtonBuilder, EmbedBuilder } from "@discordjs/builders";
import { REST } from "@discordjs/rest";
import { ButtonStyle, Routes } from "discord-api-types/v10";
import { NextResponse } from "next/server";
import { ButtonId } from "./buttonId";

const ReplyButton = new ButtonBuilder()
  .setCustomId(ButtonId.ContactReply)
  .setLabel("Mark as Replied")
  .setStyle(ButtonStyle.Success);

const SpamButton = new ButtonBuilder()
  .setCustomId(ButtonId.ContactSpam)
  .setLabel("Mark as Spam")
  .setStyle(ButtonStyle.Danger);

export default async function sendMessage(data: ContactData) {
  const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_BOT_TOKEN!);
  const row = new ActionRowBuilder().addComponents(ReplyButton, SpamButton);

  const embed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle(data.subject)
    .setAuthor({ name: `By: ${data.name}` })
    .setDescription(data.message)
    .addFields({ name: "Email", value: data.email })
    .setTimestamp()
    .setFooter({ text: "Pending Response", iconURL: "https://i.imgur.com/VIWSXf3.png" });

  try {
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
