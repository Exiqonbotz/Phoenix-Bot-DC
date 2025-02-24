const { EmbedBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const os = require("os");

module.exports = {
  name: "debug",
  async execute(message) {
    if (!message.member.permissions.has("Administrator")) {
      return message.reply("Du hast keine Berechtigung!");
    }

    // Protokollierung in der Konsole
    const timestamp = new Date().toLocaleString();
    console.log(`[DEBUG] ${timestamp} - ${message.author.tag} hat den Befehl in '${message.guild.name}' ausgeführt.`);

    // Commands
    const commandsDir = path.join(__dirname, "..");
    let commandList = [];

    function getCommands(dir) {
      fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.lstatSync(fullPath).isDirectory()) {
          getCommands(fullPath); // Falls es ein Ordner ist, weiter durchsuchen
        } else if (file.endsWith(".js")) {
          const folderName = path.basename(dir);
          commandList.push(`\`${folderName}/${file}\``);
        }
      });
    }

    getCommands(commandsDir);

    // Node Version
    const nodeVersion = process.version;

    // Packages und deren Versionen
    const packages = execSync("npm list --depth=0").toString().split("\n")
      .filter(line => line.startsWith("├──") || line.startsWith("└──"))
      .map(line => line.trim());

    // Server-Info
    const serverCount = message.client.guilds.cache.size;
    const memberCount = message.guild.memberCount;
    const channelCount = message.guild.channels.cache.size;

    // Bot-Status und Uptime
    const botPing = Math.round(message.client.ws.ping);
    const botUptime = process.uptime();
    const uptimeString = new Date(botUptime * 1000).toISOString().substr(11, 8);

    // Erstellen des Embeds
    const embed = new EmbedBuilder()
      .setTitle("Debug Info")
      .setColor("#00FFFF")
      .setDescription(`
        **Node Version:** ${nodeVersion}
        
        **Packages:**
        ${packages.join("\n")}
        
        **Bot-Server:** ${serverCount} Server
        **Server Mitglieder:** ${memberCount}
        **Server Kanäle:** ${channelCount}

        **Bot Ping:** ${botPing} ms
        **Bot Uptime:** ${uptimeString}

        **Commands:**
        ${commandList.join("\n") || "Keine Commands gefunden."}
      `);

    message.channel.send({ embeds: [embed] });
  }
};
