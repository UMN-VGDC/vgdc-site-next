import { ActionRowBuilder, ModalBuilder, TextInputBuilder } from "@discordjs/builders";
import { APIApplicationCommandInteractionDataBasicOption, TextInputStyle } from "discord-api-types/v10";

export function announcementModal(options: APIApplicationCommandInteractionDataBasicOption[]) {
  //NOTE: custom id has a max of 100 characters
  const category = options[0].value;
  const tagEveryone = options[1].value;
  const modal = new ModalBuilder()
    .setCustomId(JSON.stringify({ type: "announcement", category, tagEveryone }))
    .setTitle("Send Announcement");

  const titleInput = new TextInputBuilder()
    .setCustomId("AnnouncementTitle")
    .setLabel("Title")
    .setStyle(TextInputStyle.Short);

  const messageInput = new TextInputBuilder()
    .setCustomId("AnnouncementMessage")
    .setLabel("Message")
    .setStyle(TextInputStyle.Paragraph);

  const firstActionRow = new ActionRowBuilder().addComponents(titleInput) as ActionRowBuilder<TextInputBuilder>;
  const secondActionRow = new ActionRowBuilder().addComponents(messageInput) as ActionRowBuilder<TextInputBuilder>;

  modal.addComponents(firstActionRow, secondActionRow);
  return modal;
}
