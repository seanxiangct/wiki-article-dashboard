# Wiki article analytics 

## Project Management 

 - Link to Scrum board: http://scrumblr.ca/COMP5347
 - TODO list: https://docs.google.com/document/d/1S3tiwvEM94-5tx3GHgSUAj3tiQdEZfpuVylYkeDxVzE/edit?usp=sharing

## File Structure 

 - app
     + controllers
     + models
     + routes
     + views
 - public
     + css
 - node_modules
 - main.js
 - package.json

## Implementation 

### Import data

 - To load all json data files on Linux system
     1. Open terminal
     2. Move to the directory storing all the json files 
     3. copy the following command and press enter 

     `ls -1 *.json | while read jsonfile; do mongoimport -d support -c logs --db wikipedia --collection revisions --file $jsonfile --jsonArray; done`

     4. If importation failed, please check your database name and collections name are correct
         - database name: wikipedia
         - collection name: revisions 

### Data Preprocessing 
Please run these three javascript files after the data is successfully loaded.
 1. Run StringToDate.js 
    Convert the timestamp of all the articles to Date type.
 2. Run user_type.js
    Add another attribute 'type' for distinguishing the type of user making the article revision.
 3. Run createIndex.js
    Create index on attribute 'timestamp' to enable faster sorting. 

### Module Modification 
One of the function in node_module 'nodemw', needs to be modified prior the use of the app. 

Location: nodemw/lib/bot.js
Function name: `getArticleRevisions`

Change to: 

    getArticleRevisions( title, startTimeStamp, callback ) {
                const params = {
                    action: 'query',
                    prop: 'revisions',
                    rvprop: [ 'ids', 'timestamp', 'size', 'flags', 'comment', 'user' ].join( '|' ),
                    rvdir: 'newer', // order by timestamp asc
                    rvlimit: API_LIMIT,
                    rvstart: startTimeStamp
                };

                // both page ID or title can be provided
                if ( typeof title === 'number' ) {
                    this.log( `Getting revisions of article #${title}...` );
                    params.pageids = title;
                } else {
                    this.log( `Getting revisions of ${title}...` );
                    params.titles = title;
                }

                this.getAll(
                    params,
                    function ( batch ) {
                        const page = getFirstItem( batch.pages );
                        return page.revisions;
                    },
                    callback
                );
            },
