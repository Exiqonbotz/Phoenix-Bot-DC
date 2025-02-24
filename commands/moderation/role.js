const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "role",
  async execute(message, args) {
    if (!message.member.permissions.has("ManageRoles")) return message.reply("Du hast keine Berechtigung!");

    const member = message.mentions.members.first();
    if (!member) return message.reply("Bitte erwähne einen Nutzer!");

    const roleName = args.slice(1).join(" ");
    if (!roleName) return message.reply("Bitte gib eine Rolle an!");

    const role = message.guild.roles.cache.find(r => r.name === roleName);
    if (!role) return message.reply("Rolle nicht gefunden!");

    if (member.roles.cache.has(role.id)) {
      await member.roles.remove(role);
      return message.channel.send({ embeds: [new EmbedBuilder().setTitle("Rolle entfernt").setColor("#FF0000").setDescription(`${role.name} von ${member.user.tag} entfernt.`)] });
    } else {
      await member.roles.add(role);
      return message.channel.send({ embeds: [new EmbedBuilder().setTitle("Rolle hinzugefügt").setColor("GREEN").setDescription(`${role.name} zu ${member.user.tag} hinzugefügt.`)] });
    }
  }
};
