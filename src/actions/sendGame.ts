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

type GameFormData = {
  title: string;
  thumbnail: File | string;
  "build link": string;
  description: string;
  credits: string;
  media0: File | string;
  media1: File | string;
  media2: File | string;
  date: string;
  "theme(s)": string;
  "umn email": string;
};

async function getImgurLink(image: File) {
  const arrayBuffer = await image.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);
  const data = await fetch("https://api.imgur.com/3/image/", {
    method: "POST",
    headers: {
      Authorization: `Client-ID ${process.env.IMGUR_KEY}`,
    },
    body: buffer,
  });
  const res = await data.json();
  return res.data.link;
}

export default async function sendGame(formData: FormData) {
  const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_BOT_TOKEN!);
  const row = new ActionRowBuilder().addComponents(ApproveButton, DeclineButton);
  const data = Object.fromEntries(formData) as GameFormData;
  let images: File[] = [
    formData.get("thumbnail image"),
    formData.get("media0"),
    formData.get("media1"),
    formData.get("media2"),
  ].filter((e) => e) as File[];
  images = images.filter((e) => e.size);

  function checkUndefined(e: any) {
    return e ? e : "---";
  }

  try {
    const promises = images.map((e) => getImgurLink(e));
    const imageLinks = await Promise.all(promises);

    const embed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle(data.title)
      .setDescription(checkUndefined(data.description))
      .addFields(
        { name: "Theme", value: checkUndefined(data["theme(s)"]), inline: true },
        { name: "Date", value: checkUndefined(data.date), inline: true },
        { name: "Credits", value: checkUndefined(data.credits) },
        { name: "Build Link", value: checkUndefined(data["build link"]) },
        { name: "Thumbnail Image", value: checkUndefined(imageLinks[0]) },
        { name: "Media 1", value: checkUndefined(imageLinks[1]), inline: true },
        { name: "Media 2", value: checkUndefined(imageLinks[2]), inline: true },
        { name: "Media 3", value: checkUndefined(imageLinks[3]), inline: true },
        { name: "Contact", value: `${data["umn email"]}`, inline: true }
      )
      .setTimestamp()
      .setImage(checkUndefined(imageLinks[0]))
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
