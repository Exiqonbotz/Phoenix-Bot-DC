const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "ban",
  async execute(message, args) {
    if (!message.member.permissions.has("BanMembers")) return message.reply("Du hast keine Berechtigung!");
    const member = message.mentions.members.first();
    if (!member) return message.reply("Bitte erwähne einen Nutzer!");
    const reason = args.slice(1).join(" ") || "Kein Grund angegeben.";
    await member.ban({ reason });
    const embed = new EmbedBuilder().setTitle("Nutzer gebannt").setColor("#FF0000").addFields({ name: "Nutzer", value: member.user.tag }, { name: "Grund", value: reason }).setTimestamp();
    message.channel.send({ embeds: [embed] });
  }
};
