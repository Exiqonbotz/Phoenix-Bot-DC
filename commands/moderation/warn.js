const { EmbedBuilder } = require("discord.js");
const fs = require("fs");
const warningsFile = "./data/warnings.json";

if (!fs.existsSync(warningsFile)) fs.writeFileSync(warningsFile, JSON.stringify({}));

module.exports = {
  name: "warn",
  async execute(message, args) {
    if (!message.member.permissions.has("ModerateMembers")) return message.reply("Du hast keine Berechtigung!");
    const member = message.mentions.members.first();
    if (!member) return message.reply("Bitte erwähne einen Nutzer!");
    const reason = args.slice(1).join(" ") || "Kein Grund angegeben.";

    let warnings = JSON.parse(fs.readFileSync(warningsFile, "utf8"));
    if (!warnings[member.id]) warnings[member.id] = [];
    warnings[member.id].push(reason);
    fs.writeFileSync(warningsFile, JSON.stringify(warnings, null, 2));

    const embed = new EmbedBuilder()
      .setTitle("Verwarnung erteilt")
      .setColor("#FFFF00")
      .addFields({ name: "Nutzer", value: member.user.tag }, { name: "Grund", value: reason })
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  }
};
