//create index on timestamp to improve efficiency of queries that use timestamp field
db.revisions.createIndex({timestamp:1});