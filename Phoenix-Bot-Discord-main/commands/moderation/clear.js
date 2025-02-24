const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "clear",
  async execute(message, args) {
    if (!message.member.permissions.has("ManageMessages")) return message.reply("Du hast keine Berechtigung!");
    
    const amount = parseInt(args[0]);
    if (!amount || amount < 1 || amount > 100) return message.reply("Bitte gib eine Zahl zwischen 1 und 100 an!");

    await message.channel.bulkDelete(amount, true);

    const embed = new EmbedBuilder()
      .setTitle("Nachrichten gelöscht")
      .setColor("#0000FF")
      .setDescription(`${amount} Nachrichten wurden gelöscht.`);

    message.channel.send({ embeds: [embed] }).then(msg => setTimeout(() => msg.delete(), 5000));
  }
};
