const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "debug-role",
  async execute(message) {
    if (!message.member.permissions.has("ManageRoles")) {
      return message.reply("Du hast keine Berechtigung!");
    }

    const roles = message.guild.roles.cache
      .map(role => `\`${role.id}\` - ${role.name}`)
      .join("\n");

    const embed = new EmbedBuilder()
      .setTitle("Rollen & IDs")
      .setColor("#00FFFF")
      .setDescription(roles || "Keine Rollen gefunden.");

    message.channel.send({ embeds: [embed] });
  }
};