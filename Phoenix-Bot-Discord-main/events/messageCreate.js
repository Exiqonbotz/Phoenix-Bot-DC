module.exports = {
  name: "messageCreate",
  async execute(message, client) {
    if (message.author.bot || !message.content.startsWith(".")) return;

    const args = message.content.slice(1).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName);

    if (!command) return;

    try {
      await command.execute(message, args);
    } catch (error) {
      console.error(error);
      message.reply({ content: "Es gab einen Fehler beim Ausführen des Befehls!", ephemeral: true });
    }
  }
};
