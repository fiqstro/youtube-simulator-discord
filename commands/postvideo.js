let moment = require("moment");
require("moment-duration-format");
let Discord = require("discord.js");

module.exports = {
  name: "postvideo",
  description: "Posts a youtube video.",
  aliases: ["postvid", "pv", "upload", "uploadvideo"],
  run: async (client, message, args, janix) => {
    client.db.ensure(`strikes_${message.author.id}`, 0);
    client.db.ensure(`demstrike_${message.author.id}`, 0);
    let ctb = client.db.get(`yt_${message.author.id}`, "currentlaptop.breakchance")
    let chancetobreak = Math.floor(Math.random() * ctb)
    let cbreak = 900000;
    let time = client.db.get(`broken_${message.author.id}`)
    let cp = client.db.get(`yt_${message.author.id}`, "prestige.name");
    let csub = client.db.get(`yt_${message.author.id}`, "yt.subscribers");
    let devname = client.db.get(`yt_${message.author.id}`, "currentlaptop")
    
    if(csub > 25000000 && cp !== "Legendary I") {
      return message.channel.send(`${janix.no} | Oh no! You have reached the maximum subscribers that you are allowed to have in your current prestige. To update your prestige, please do \`yt.prestige\`!`)
    }
  
     const filter0 = response => {
      return response.author.id === message.author.id;
    };
    if(time !== null && cbreak - (Date.now() - time) > 0) {  
   return message.channel.send(`${janix.no} | Your ${devname.displayname} is broken! It will take **${moment.duration(cbreak - (Date.now() - time)).format("m [mins] s [secs]")} till you fix it!**\nDo you want to fix it instantly with 49.99$? (yes or no)`).then(()=>{
     
     if(chancetobreak <= 10) {
      message.channel.send(`${janix.no} | Oh no! Your ${devname.displayname} broke! Now you have to wait **15 minutes** before you can fix it!`)
      return client.db.set(`broken_${message.author.id}`, Date.now())
    }
     
     message.channel
          .awaitMessages(filter0, { max: 1, time: 10000, errors: ["time"] })
          .then(collected1 => {
       if(collected1.first().content.toLowerCase() === "yes") {
         let balance = client.db.get(`yt_${message.author.id}`, "bal.wallet");
         if(balance < 49.99) {
           return message.channel.send(`${janix.no} | You don't have enough money!`)
         } else {
            client.db.delete(`broken_${message.author.id}`)
            client.removemoney(message.author.id, 49.99)
            message.channel.send(`${janix.yes} | Your ${devname.displayname} is fixed!`)
         }
       } else if(collected1.first().content.toLowerCase() === "no") {
           return message.channel.send(`${janix.no} | Alright, offer canceled.`)
       }
     }).catch(e => {
       console.log(e)
       return message.channel.send(`${janix.no} | No response, offer canceled.`)
     })
   })  
   }
    
    let games = client.db.get(`yt_${message.author.id}`, "games");
    let construct = {
      title: null,
      game: null,
      views: null,
      likes: null,
      dislikes: null,
      comments: [],
      video: null,
      category: null,
      thumbnail: null,
      monetized: null,
      monetizedRe: null,
    };
    let toadd = {};

    const filter1 = response => {
      return response.author.id === message.author.id;
    };

    const filter2 = response => {
      return response.author.id === message.author.id && 
        client.db
        .get(`yt_${message.author.id}`, `games`)
        .map(a => a.name)
      .includes(response.content.toLowerCase())
    };
    message.channel
      .send("Alright, before you upload your video, what is the video title?")
      .then(() => {
        message.channel
          .awaitMessages(filter1, { max: 1, time: 30000, errors: ["time"] })
          .then(collected1 => {
          if(collected1.first().content.length > 100) return message.channel.send(`${janix.no} | Title is too long! Max 100 characters.`)
          
            construct.title = collected1.first().content;
            let a = collected1.first().content.split(" ");
            let swearw = ["fuck", "shit", "dick", "くそ", "f1ck", "bitch", "pussy", "poop", "butch", "fook", "cum", "cumming", "wank", "masturbate", "fap", "fucking", "dicks", "retard", "sex", "porn", "hentai", "blowjob", "18+", "cock", "ass", "dumbass", "fortnite", "roblox", "booty" ,"nigger", "negro"]

            if(swearw.some(word => collected1.first().content.toLowerCase().includes(word))) {
              construct.monetized = false;
              construct.monetizedRe = "Demonetized - Inappropriate Title";
              client.db.inc(`demstrike_${message.author.id}`);
            }  else {
              construct.monetized = true;
              construct.monetizedRe = "Monetized"
            }
            message.channel
              .send(
                `Alright, so your video title is **${
                  construct.title
                }**, now what is the game that you are gonna play in your video? Select one of these:
\n\`${games.map(a => `${a.name}`).join("`, `")}\``
              )
              .then(() => {
                message.channel.awaitMessages(filter2, {
                    max: 1,
                    time: 30000,
                    errors: ["time"]
                  }).then(collected2 => {
                    let videos = client.db
                      .get(`yt_${message.author.id}`, `games`)
                      .map(a => a);
                 // console.log(collected2.first().content)
                    videos.forEach(video => {
                      if (
                        collected2.first().content.toLowerCase() === video.name
                      ) {
                        message.channel.send("UPLOADING...").then(m=>{
                        m.delete();
                        let totalviews = client.db.get(
                          `yt_${message.author.id}`,
                          "yt.totalviews"
                        );
                        let subs = client.db.get(
                          `yt_${message.author.id}`,
                          "yt.subscribers"
                        );
                        let intrest = video.intrest;
                        let views =
                          (Math.floor(Math.random() * 15) + 5) *
                          (subs * 0.005 + 1) *
                          video.intrest;
                        let likes = views * 0.25;
                        let dislikes = views * 0.03 * video.hates;
                        let subsearned = Math.round(
                          Math.random() * 2 + 8 * (views * 0.005)
                        );
                        let revenue = Number(
                          (views * 0.005 + likes * 0.005 / 10).toFixed(2)
                        );
                        if(construct.monetized === false) revenue = 0;

                        construct.game = video.displayname;
                        construct.likes = Math.floor(likes);
                        construct.dislikes = Math.floor(dislikes);
                        construct.video = `${construct.title}`;
                        construct.views = Math.floor(views);
                        construct.category = video.category;
                        // comments shit
                        let likecomments = Math.floor(Math.sqrt(likes));
                        let dislikecomments = Math.floor(Math.sqrt(dislikes));
                        
                        let goodcomments = client.comments.goodReplies(
                          video.name, message.author
                        );
                        let badcomments = client.comments.badReplies(
                          video.name, message.author
                        );
                        let arr = [];
                          
                        for (var i = 0; i < likecomments; i++) {
                          let user = client.users.random()
                          if(likecomments > 0) {arr.push(
                            `<:happyfys:682921824404766795> **${user.username}**: ${
                              goodcomments[
                                Math.floor(Math.random() * goodcomments.length)
                              ]
                            } | ${Math.floor(Math.random() * Math.cbrt(likes))} 👍`
                          );}
                        }
                    
                        for (var i = 0; i < dislikecomments; i++) {
                          //let users = client.users.array().slice(0, 10000)
                          // ^^ nooo, bad very bad
                          
                          let user = client.users.random()
                          arr.push(
                            `<:sadfys:682921471894355968> **${user.username}**: ${
                              badcomments[
                                Math.floor(Math.random() * badcomments.length)
                              ]
                            } | ${Math.floor(Math.random() * Math.cbrt(likes))} 👍`
                          );
                        }

                        function shuffle(array) {
                          var currentIndex = array.length,
                            temporaryValue,
                            randomIndex;

                          while (0 !== currentIndex) {
                            randomIndex = Math.floor(
                              Math.random() * currentIndex
                            );
                            currentIndex -= 1;

                            temporaryValue = array[currentIndex];
                            array[currentIndex] = array[randomIndex];
                            array[randomIndex] = temporaryValue;
                          }

                          return array;
                        }
                        let array = shuffle(arr);

                        array.length = 5;
                        let totalvideos = client.db.get(
                          `yt_${message.author.id}`,
                          "yt.totalvideos"
                        );
                        totalvideos++;
                        // db shit
                        let substoadd = client.db.get(
                          `yt_${message.author.id}`,
                          "yt.subscribers"
                        );
                        substoadd += subsearned;
                        let viewsearned = client.db.get(
                          `yt_${message.author.id}`,
                          "yt.totalviews"
                        );
                        viewsearned += views;
                        let likesearned = client.db.get(
                          `yt_${message.author.id}`,
                          "yt.likes"
                        );
                        likesearned += likes;
                        let dislikesearned = client.db.get(
                          `yt_${message.author.id}`,
                          "yt.dislikes"
                        );
                        dislikesearned += dislikes;
                        let titleidarr = construct.title.split(" ");
                        let titleid = titleidarr.join("");
                        construct.comments = arr;
                        let currentbal = client.db.get(
                          `yt_${message.author.id}`,
                          "bal.bank"
                        );
                        currentbal += revenue;

                        client.db.set(
                          `yt_${message.author.id}`,
                          currentbal,
                          "bal.bank"
                        );
                        client.db.set(
                          `yt_${message.author.id}`,
                          totalvideos,
                          "yt.totalvideos"
                        );
                        client.db.set(
                          `yt_${message.author.id}`,
                          substoadd,
                          "yt.subscribers"
                        );
                        client.db.set(
                          `yt_${message.author.id}`,
                          viewsearned,
                          "yt.totalviews"
                        );
                        client.db.set(
                          `yt_${message.author.id}`,
                          likesearned,
                          "yt.likes"
                        );
                        client.db.set(
                          `yt_${message.author.id}`,
                          dislikesearned,
                          "yt.dislikes"
                        );
                        let check = client.db.get(
                          `yt_${message.author.id}`,
                          "yt.videos"
                        );
                        if (!check) {
                          client.db.set(
                            `yt_${message.author.id}`,
                            [],
                            "yt.videos"
                          );
                          client.db.push(
                            `yt_${message.author.id}`,
                            construct,
                            "yt.videos"
                          );
                        } else if (check.length > 5) {
                          client.db.set(
                            `yt_${message.author.id}`,
                            [],
                            "yt.videos"
                          );
                          client.db.push(
                            `yt_${message.author.id}`,
                            construct,
                            "yt.videos"
                          );
                        } else {
                          client.db.push(
                            `yt_${message.author.id}`,
                            construct,
                            "yt.videos"
                          );
                        }
                        let bal = client.db.get(`yt_${message.author.id}`, "bal.wallet") + client.db.get(`yt_${message.author.id}`, "bal.bank")
                        bal += revenue
                        client.db.set(`yt_${message.author.id}.rev`, bal, "bal.rev")
                        let xpamount = Math.floor(
                          Math.floor(Math.random() * 50) + 5
                        );

                        let currentxp = client.db.get(
                          `yt_${message.author.id}`,
                          "xp"
                        );
                        currentxp += xpamount;
                        client.db.set(
                          `yt_${message.author.id}`,
                          currentxp,
                          "xp"
                        );
                        // embed shit
                        message.channel.send(
                          new Discord.RichEmbed()
                            .setAuthor(construct.video)
                            .setThumbnail(video.thumbnail)
                            .setDescription(`By: ${message.author.username} `)
                            .setColor("RED")
                            .addField("Views", construct.views.toLocaleString())
                            .addField("Game", construct.game)
                            .addField(
                              "Subscribers Earned",
                              Math.floor(subsearned).toLocaleString()
                            )
                            .addField("Revenue", `${Number(revenue).toLocaleString()}$`)
                            .addField("Monetization Status", construct.monetizedRe)
                            .addField("Comments", array.map(a => a).join("\n")
                                     )
                            .setFooter(
                              `👍 ${construct.likes.toLocaleString()} | 👎 ${construct.dislikes.toLocaleString()}`
                            )
                        );
                        })
                      }
                    });
                  })
                  .catch(e => {
                    console.log(e);
                    return message.channel.send(
                      `${janix.no} | No response, upload canceled.`
                    );
                  });
              });
          })
          .catch(e => {
            console.log(e);
            return message.channel.send(
              `${janix.no} | No response, upload canceled.`
            );
          });
      });
  }
};
