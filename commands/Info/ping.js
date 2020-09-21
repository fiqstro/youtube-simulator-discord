const Command = require("../../base/Command");
const { CanvasRenderService } = require('chartjs-node-canvas');
var Canvas = require('canvas');
const Discord = require('discord.js');
class Ping extends Command {
  constructor(client) {
    super(client, {
      name: "ping",
      permLevel: "0",
      category: "Info",
      usage: ""
    });
  };

  async run(client, message, args) {
   let m = await message.channel.send("awaiting...")
    var Canvas = require('canvas')
    const width = 1000; //px
    const height = 500; //px
    const canvasRenderService = new CanvasRenderService(width, height, (ChartJS) => { ChartJS.defaults.global.defaultFontColor = '#FFF'; });
    let ping = Date.now() - m.createdTimestamp;
    client.pings.push(ping);
    if(client.pings.length > 50) client.pings.shift();
    client.db.set(`pingcache`, client.pings);
    let index = 0;
    const configuration = {
        type: 'line',
      elements: {
        line: {
            tension: 0
        }
    },
        data: {
            labels: client.pings.map(a => index += 1),
            datasets: [{
                data: client.pings,
                label: "Bot ping",
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(75, 192, 192, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        callback: (value) => value
                    }
                }]
            },
              legend: {
              display: false
          },
          tooltips: {
              callbacks: {
                 label: function(tooltipItem) {
                        return tooltipItem.yLabel;
                 }
              }
          }
        }
    };
    const image = await canvasRenderService.renderToBuffer(configuration);
    const dataUrl = await canvasRenderService.renderToDataURL(configuration, 0.5);
    const stream = canvasRenderService.renderToStream(configuration);
  let mm = "";
  if(ping < 50) mm = "Very fast";
  if(ping >= 50 && ping < 100) mm = "Fast";
  if(ping >= 100 && ping < 200) mm = "Average";
  if(ping >= 200 && ping < 500) mm = "Slow";
  if(ping >= 500 && ping < 1000) mm = "Very slow";
  if(ping >= 1000) mm = "Extremely slow";
  m.delete();
   message.channel.send(`Result: **${ping}ms** - **${mm}**`, {
    files: [{
      attachment: image,
      name: `fuckstro.png`
    }]
  });
  };   
};

module.exports = Ping;