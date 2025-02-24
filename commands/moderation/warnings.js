const { EmbedBuilder } = require("discord.js");
const fs = require("fs");
const warningsFile = "./data/warnings.json";

module.exports = {
  name: "warnings",
  async execute(message, args) {
    const member = message.mentions.members.first();
    if (!member) return message.reply("Bitte erwähne einen Nutzer!");

    let warnings = JSON.parse(fs.readFileSync(warningsFile, "utf8"));
    const userWarnings = warnings[member.id] || [];

    const embed = new EmbedBuilder()
      .setTitle(`Verwarnungen von ${member.user.tag}`)
      .setColor("#FFFF00")
      .setDescription(userWarnings.length ? userWarnings.map((w, i) => `**${i + 1}.** ${w}`).join("\n") : "Keine Verwarnungen.");

    message.channel.send({ embeds: [embed] });
  }
};
