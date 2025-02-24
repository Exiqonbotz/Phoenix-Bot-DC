const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "botinfo",
  async execute(message) {
    const embed = new EmbedBuilder()
      .setTitle("Pheonix Bot Info")
      .setColor("#0000FF")
      .addFields(
        { name: "Entwickler", value: "Hadex" },
        { name: "Version", value: "1.0.0" },
        { name: "Server", value: `${message.client.guilds.cache.size}`, inline: true }
      )
      .setFooter({ text: "Pheonix Bot", iconURL: message.client.user.displayAvatarURL() });

    message.channel.send({ embeds: [embed] });
  }
};
