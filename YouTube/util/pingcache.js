module.exports.run = client => {
  
  let pingcache = client.db.get("pingcache") || [];
  client.pings = pingcache;
  
}