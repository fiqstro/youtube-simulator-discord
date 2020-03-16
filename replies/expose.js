
module.exports = {
  expose: (user) => {let arr = [
  `You made a video, exposing ${user} for hacking.`,
  `You tried to expose ${user} for being a scammer.`,
  `You made an exposing video on ${user} for bullying you in 5th grade.`,
  `You tried to get ${user}'s video terminated, because he clickbaits.`,
  `You tried to expose ${user} for treating you unfairly.`,
  `You tried to expose ${user} for raiding your Discord server.`
]
return arr;},
  response: (user) => { let arr = [
 `${user} made a response video on you, and said you were lying.`,
 `${user} tried to get revenge, by exposing you as well.`,
 `${user} responded to your video, and claimed that ${user} didn't do anything.`,
 `You got a response from ${user}, and he/she tried to make a video to roast you.`,
 `${user} tried to be emotional in the response video, and cried on camera.`
]
return arr;},
  sucsess: (user) => {
    let sucsess = [
      `You gained ${user}'s viewer's trust, and they believe you!`,
      `Other youtubers started exposing ${user}! And you gained a lot of attention!`,
      `${user} suddenly apologized, and admitted his mistakes like a champ!`,
      `You made another video, that literally ended ${user}'s career!`,
      `${user} made a very bad video on you again, and people started hating on ${user}!`
    ]
    return sucsess;
  },
  fail: (user) => {
    let arr = [
      `Your viewers lost their trust on you, and they chose ${user}'s side.`,
      `${user} somehow made your viewers hate you, and they started to turn on you.`,
      `You didn't have enough proof, and you failed to expose.`,
      `Your viewers felt bad for ${user}, so they started to hate on you.`,
      `${user}'s viewers started to attack your channel, you got scared so you made an apology video.`
    ]
    return arr;
  }
}
