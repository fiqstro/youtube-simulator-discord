module.exports = {
  deleteItem: async function(item, client, user) {
    
    if(item.quantity > 1) {
      client.db.math(`yt_${user.id}`, "-", 1, `inventory.${item.id}.quantity`)
      console.log(`[INFO] Subtracted 1 item quantity from user id ${user.id}`)
    } else {
      client.db.delete(`yt_${user.id}`, "inventory." + item.id);
      console.log(`[INFO] Deleted 1 item from user id ${user.id}`)
    }
    
  }
}