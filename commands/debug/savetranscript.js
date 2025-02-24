const fs = require("fs");
const path = require("path");

module.exports = {
  name: "savetranscript",
  async execute(message) {
    if (!message.member.permissions.has("Administrator")) {
      return message.reply("Du hast keine Berechtigung!");
    }

    const channel = message.channel;
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const fileName = `chat-${channel.name}-${timestamp}.txt`;
    const filePath = path.join(__dirname, "..", fileName);

    let messages = await channel.messages.fetch({ limit: 100 });
    messages = messages.sort((a, b) => a.createdTimestamp - b.createdTimestamp);
    
    const chatContent = messages.map(msg => `${msg.author.tag}: ${msg.content}`).join("\n");
    fs.writeFileSync(filePath, chatContent);

    message.reply(`Chatverlauf gespeichert: \`${fileName}\``);
    console.log(`[TRANSCRIPT] ${timestamp} - Chatverlauf in '${channel.name}' gespeichert als '${fileName}'.`);
  }
};
