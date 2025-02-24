const { Events, EmbedBuilder } = require("discord.js");

// Feste Log-Channel-ID
const logChannelId = "989526063719776307";

module.exports = (client) => {
  client.on(Events.MessageCreate, (message) => {
    if (message.author.bot) return;
    logEvent(client, "Nachricht gesendet", message.guild, [
      { name: "User", value: message.author.tag, inline: true },
      { name: "Channel", value: `<#${message.channel.id}>`, inline: true },
      { name: "Nachricht", value: message.content || "Keine Nachricht", inline: false },
    ]);
  });

  client.on(Events.GuildMemberAdd, (member) => {
    logEvent(client, "Benutzer beigetreten", member.guild, [{ name: "User", value: member.user.tag }]);
  });

  client.on(Events.GuildMemberRemove, (member) => {
    logEvent(client, "Benutzer verlassen", member.guild, [{ name: "User", value: member.user.tag }]);
  });

  client.on(Events.MessageDelete, (message) => {
    if (message.author.bot) return;
    logEvent(client, "Nachricht gelöscht", message.guild, [
      { name: "User", value: message.author.tag, inline: true },
      { name: "Channel", value: `<#${message.channel.id}>`, inline: true },
      { name: "Nachricht", value: message.content || "Keine Nachricht", inline: false },
    ]);
  });

  client.on(Events.VoiceStateUpdate, (oldState, newState) => {
    if (!oldState.channel && newState.channel) {
      logEvent(client, "Sprachkanal beigetreten", newState.guild, [
        { name: "User", value: newState.member.user.tag },
        { name: "Channel", value: newState.channel.name },
      ]);
    }
  });

  client.on(Events.GuildRoleCreate, (role) => {
    logEvent(client, "Rolle erstellt", role.guild, [{ name: "Rolle", value: role.name }]);
  });

  client.on(Events.GuildRoleDelete, (role) => {
    logEvent(client, "Rolle gelöscht", role.guild, [{ name: "Rolle", value: role.name }]);
  });

  client.on(Events.GuildUpdate, (oldGuild, newGuild) => {
    const changes = [];
    if (oldGuild.name !== newGuild.name) changes.push(`**Servername:** ${oldGuild.name} ➝ ${newGuild.name}`);
    if (oldGuild.icon !== newGuild.icon) changes.push(`**Servericon geändert**`);

    if (changes.length > 0) {
      logEvent(client, "Server aktualisiert", newGuild, [{ name: "Änderungen", value: changes.join("\n") }]);
    }
  });
};

function logEvent(client, description, guild, fields = []) {
  const logChannel = client.channels.cache.get(logChannelId);
  if (!logChannel) return;

  const embed = new EmbedBuilder()
    .setTitle("LOG")
    .setColor("#A020F0")
    .setDescription(description)
    .addFields(fields)
    .setTimestamp();

  logChannel.send({ embeds: [embed] }).catch(console.error);
}
