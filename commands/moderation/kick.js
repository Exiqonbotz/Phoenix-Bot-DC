const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "kick",
  async execute(message, args) {
    if (!message.member.permissions.has("KickMembers")) return message.reply("Du hast keine Berechtigung!");

    const member = message.mentions.members.first();
    if (!member) return message.reply("Bitte erwähne einen Nutzer!");

    const reason = args.slice(1).join(" ") || "Kein Grund angegeben.";
    
    await member.kick(reason);
    
    const embed = new EmbedBuilder()
      .setTitle("Nutzer gekickt")
      .setColor("#FF0000")
      .addFields({ name: "Nutzer", value: member.user.tag, inline: true }, { name: "Grund", value: reason, inline: true })
      .setTimestamp();
    
    message.channel.send({ embeds: [embed] });
  }
};
