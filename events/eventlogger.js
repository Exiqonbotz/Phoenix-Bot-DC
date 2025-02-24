const { Events } = require("discord.js");

module.exports = (client) => {
  client.on(Events.MessageCreate, (message) => {
    if (message.author.bot) return; 

    const timestamp = new Date().toLocaleString();
    const chatType = message.guild ? `Server: ${message.guild.name}` : "Private Nachricht";

    
    if (message.content.startsWith(".")) {
      console.log(`[Command] ${timestamp} - ${message.author.tag} - ${message.content}`);
      return; // Stoppe hier, damit der Befehl nicht nochmal als normale Nachricht geloggt wird.
    }

    // Normales Loggen der Nachricht (nur, wenn sie kein Befehl ist)
    console.log(`[MSG - ${chatType}] ${timestamp} - ${message.author.tag} - ${message.content}`);
  });
};
