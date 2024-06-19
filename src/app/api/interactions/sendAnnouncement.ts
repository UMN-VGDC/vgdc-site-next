import { AnnouncementType } from "@/commands";
import { EmbedBuilder } from "@discordjs/builders";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v10";

export async function sendAnnouncement(interaction: any, category: string, tagEveryone: boolean) {
  const title = interaction.data?.components[0].components[0].value;

  const content = interaction.data?.components[1].components[0].value;

  const nickname = interaction.member.nick;
  const username = interaction.member.user.global_name;
  const type = toTitleCase(category);

  let color: number;
  //list of colors
  //https://gist.github.com/thomasbnt/b6f455e2c7d743b796917fa3c205f812
  switch (type) {
    case AnnouncementType.Event:
      color = 5763719; //green
      break;
    case AnnouncementType.GameJam:
      color = 10181046; //purple
      break;
    case AnnouncementType.Schedule:
      color = 16776960; //yellow
      break;
    case AnnouncementType.Themes:
      color = 3447003; //blue
      break;
    case AnnouncementType.Other:
      color = 9807270; //grey
      break;
    default:
      color = 9936031; //dark grey
  }

  const embed = new EmbedBuilder()
    .setColor(color)
    .setTitle(title)
    .setAuthor({ name: type })
    .setDescription(content)
    .setTimestamp()
    .setFooter({ text: `By ${username}${nickname ? ", aka " + nickname : ""}` });

  try {
    const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_BOT_TOKEN!);
    await rest.post(Routes.channelMessages(process.env.DISCORD_ANNOUNCEMENTS_CHANNEL_ID!), {
      body: {
        content: tagEveryone ? "@everyone" : null,
        embeds: [embed],
      },
    });

    const data = {
      message: content,
      author: username,
      date: new Date().toLocaleDateString(),
      type,
      title,
      spreadsheet: "addAnnouncements",
    };

    await fetch(process.env.SPREADSHEET_ENDPOINT_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(data),
    });
    return { status: 200 };
  } catch (err) {
    console.error(err);
    return { status: 500, message: err };
  }
}

function toTitleCase(str: string) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}
