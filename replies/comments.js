module.exports.likes = (user, game) => {
  let comment = [
    `Nice video, ${user}!`,
    `10/10 video, ${user}!`,
    `Wow, this channel ${user} is underrated...`,
    `Very funny video, ${user}! Keep it up, mate.`,
    `Nice content. Subbed :v`,
    `Your videos are the best! Notice me!`,
    `Yes! Please upload more ${game} videos! Thank you :)`,
    `Cool video.`,
    `Nice :D`,
    `Wow. Somehow **T-Series** has more subscribers than you... smh`
  ]
  return comment.random();
}

module.exports.dislikes = (user, game) => {
  let comment = [
    `${game} videos!?!? DISGUSTING!!! DISLIKE`,
    `Eww wtf`,
    `Dude, your channel sucks. Just quit lol`,
    `Poop channel`,
    `You sound like a dumbass.`,
    `Disgusting...`,
    `You act like 12, dude`,
    `Edgy af`,
    `Cringe.`,
    `Like if you think ${user} should be terminated from youtube.`,
    `LMFAO this video is so bad...`,
    `A 3 years old could've made this video.`,
    `Wow... Even my grandma could do better..`
  ]
  return comment.random();
}