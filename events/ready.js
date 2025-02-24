module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    console.log(`${client.user.tag} läuft nun mit dem Prefix " . "`);

    // Rich Precense (safe falsch geschrieben)
    const activities = [
      {
        name: "phoenixgermany.com",
        type: 0,
        assets: {
          largeImage: "phoenix", 
          largeText: "Phoenix Germany" 
        }
      },
      {
        name: ".menu",
        type: 0,
      },
      {
        name: "Wir suchen Teamler",
        type: 0,
      }
    ];

    let activityIndex = 0;

    
    client.user.setPresence({
      activities: [activities[activityIndex]],
      status: "online"
    });

    
    setInterval(() => {
      activityIndex = (activityIndex + 1) % activities.length;
      client.user.setPresence({
        activities: [activities[activityIndex]],
        status: "online"
      });
    }, 5000);
  }
};
