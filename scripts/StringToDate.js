var cursor = db.revisions.find(); 
while (cursor.hasNext()) { 
  var doc = cursor.next(); 
  db.revisions.update({_id : doc._id}, {$set : {timestamp : new ISODate(doc.timestamp) }});
}