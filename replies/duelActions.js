module.exports.action = (user1, user2, damage) => {
  let arr = [
    `${user1} called ${user2} a pig! And that dealt ${damage} Charisma Points!`,
    `${user1} called ${user2} a cow! And that dealt ${damage} Charisma Points!`,
    `${user1} made an epic diss track on ${user2}, and that dealt ${damage} Charisma Points!`,
    `${user1} made an exposing video on ${user2}, and that dealt ${damage} Charisma Points!`,
    `${user1} tried to made other youtubers hate on ${user2}, and that dealt ${damage} Charisma Points!`,
    `${user1} made a joke on ${user2}, and that dealt ${damage} Charisma Points!`,
    `${user1} made a video, crying about ${user2} and that dealt ${damage} Charisma Points!`,
    `${user1} sneaked into to ${user2}'s house, recorded him/her punching a kid then posted on ${user1}'s channel, and that dealt ${damage} Charisma Points!`,
    `${user1} expooosed ${user2} so hard, and that dealt ${damage} Charisma Points!`,
    `${user1} asked haters opinion on ${user2}, and they exposed ${user2} so hard ${user2} lost ${damage} Charisma Points!`,
    `${user1} reacted to ${user2}'s video, and he exposed it so hard and that dealt ${damage} Charisma Points!`,
    `${user1} made a video, and roasted ${user2} so hard, that dealt ${damage} Charisma Points!`,
    `${user1} set up a eye-to-eye roast standoff with ${user2}, and ${user1} won, and dealt ${damage} Charisma Points!`,
    `${user1} made false controversies on ${user2}, but it somehow worked and dealt ${damage} Charisma Points!`,
    `${user1} dropped a diss track with 3 other youtubers, and that dealt ${damage} charisma points!`,
  ]
  let msg = arr[Math.floor(Math.random() * arr.length)];
  return msg;
}