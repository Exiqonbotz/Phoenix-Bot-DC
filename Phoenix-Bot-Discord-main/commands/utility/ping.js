const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "ping",
  async execute(message) {
    const embed = new EmbedBuilder()
      .setTitle("Pong!")
      .setColor("#00FF00")
      .setDescription(`🏓 Bot-Latenz: **${Date.now() - message.createdTimestamp}ms**\n⏳ API-Latenz: **${message.client.ws.ping}ms**`);

    message.channel.send({ embeds: [embed] });
  }
};
