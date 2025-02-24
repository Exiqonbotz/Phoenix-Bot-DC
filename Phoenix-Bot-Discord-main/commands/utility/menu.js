const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "menu",
  async execute(message) {
    const embed = new EmbedBuilder()
      .setTitle("📌 Pheonix Bot Menü")
      .setColor("#FFD700")
      .setDescription("Hier sind alle verfügbaren Befehle für den Bot:")
      .addFields(
        { name: "🛠 Moderation", value: "`+kick @User Grund`\n`+ban @User Grund`\n`+unban User-ID`\n`+warn @User Grund`\n`+warnings @User`\n`+clear Anzahl`", inline: false },
        { name: "📌 Info & Utility", value: "`+botinfo`\n`+ping`\n`+menu`", inline: false }
      )
      .setFooter({ text: "Pheonix Bot", iconURL: message.client.user.displayAvatarURL() });

    message.channel.send({ embeds: [embed] });
  }
};
