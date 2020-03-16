module.exports.prestige = async (client, user, prestigeName, prestigeLevel, prestigeIcon, bonusXp) => {
client.db.set(`yt_${user.id}`, {
    tag: user.tag,
    id: user.id,
    level: 1,
    xp: 0,
    awards: {
      current: null,
      all: []
    },
    prestige: {
      level: prestigeLevel,
      name: prestigeName,
      icon: prestigeIcon,
      bonus: bonusXp
    },
    bal: {
      bank: 0,
      wallet: 0,
      rev: 0
    },
    yt: {
      subscribers: 0,
      totalviews: 0,
      likes: 0,
      dislikes: 0,
      totalvideos: 0
    },
    games: [
      {
        name: "plants vs zombies",
        id: "1",
        intrest: 1.5,
        hates: 1.75,
        displayname: "Plants VS Zombies",
        thumbnail:
          "https://steamcdn-a.akamaihd.net/steam/apps/3590/0000008157.1920x1080.jpg"
      },
      {
        name: "candy crush",
        id: "2",
        intrest: 1.5,
        hates: 1.75,
        displayname: "Candy Crush",
        thumbnail:
          "https://miro.medium.com/max/643/1*QxT8Hiy1jclTGEzu-fRANQ.jpeg"
      }
    ]
  });
  
}