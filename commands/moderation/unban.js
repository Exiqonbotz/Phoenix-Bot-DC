const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "unban",
  async execute(message, args) {
    if (!message.member.permissions.has("BanMembers")) return message.reply("Du hast keine Berechtigung!");
    const userId = args[0];
    if (!userId) return message.reply("Bitte gib eine User-ID an!");
    try {
      const user = await message.guild.members.unban(userId);
      const embed = new EmbedBuilder().setTitle("Nutzer entbannt").setColor(" #FF0000").addFields({ name: "Nutzer", value: user.tag }).setTimestamp();
      message.channel.send({ embeds: [embed] });
    } catch (err) {
      message.reply("Fehler: Nutzer nicht gefunden oder nicht gebannt.");
    }
  }
};
