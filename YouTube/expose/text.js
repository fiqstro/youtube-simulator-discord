module.exports.first = (exposer, exposed, reason) => {
  let text = `**${exposer}** tried to expose **${exposed}** for **${reason}**.`
  return text;
}

module.exports.response = (exposer, exposed) => {
  let texts = [
    `**${exposed}** made a response video, and insulted **${exposer}**'s appearence!`,
    `**${exposed}** made a disstrack on **${exposer}**!`,
    `**${exposed}** made a resonse video, and cried like a baby.`,
    `**${exposed}** tried to cancel **${exposer}** by using his old tweets!`,
    `**${exposed}** made a response video, and he had a mental breakdown.`,
    `**${exposed}** roasted the shit out of **${exposer}** on his response video!`,
    `**${exposed}** attempted to make people feel bad and talks about his depression.`
  ]
  return texts.random();
}

module.exports.result = (winner, loser) => {
  let texts = [
    `**${winner}** convinced the viewers to go onto his side, and **${loser}** is starting to lose subscribers!`,
    `Another channel made a video, defending **${winner}** and exposed **${loser}**, **${winner}** is gaining more and more support!`,
    `People think that **${loser}** is on the wrong side! They started to unsubscribe!`,
    `**${loser}** was caught lying and is losing subscribers! **${winner}** is starting to gain more support!`,
    `**${winner}** got alot of support from people and they started to hate on **${loser}**!`
  ]
  return texts.random();
}