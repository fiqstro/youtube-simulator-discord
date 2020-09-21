
module.exports.getOpt = () => {
  
var opt = [{
  optionName: "Pedophilia",
  subLoseRate: 0.20
},
{
  optionName: "Robbing",
  subLoseRate: 0.17
},
{
  optionName: "Racism",
  subLoseRate: 0.5
},
{
  optionName: "Sexual abuse",
  subLoseRate: 0.25
},
{
  optionName: "Sexism",
  subLoseRate: 0.15
},
{
  optionName: "Being a dick",
  subLoseRate: 0.10
}];
  
  
function removeArrayItem(name) {
  
    const index = opt.indexOf(name);
    if (index > -1) {
    opt.splice(index, 1);
    }
}
  
  let o1 = opt.random()
  removeArrayItem(o1)
  let o2 = opt.random()
  removeArrayItem(o2)
  let o3 = opt.random()
  removeArrayItem(o3)
  let arr = [o1, o2, o3]
  
  return {
    first: o1, second: o2, third: o3, toArray: arr
  }
  
}