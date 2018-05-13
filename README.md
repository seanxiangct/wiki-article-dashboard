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

 - To load all json data files
     1. Open Linux terminal
     2. Move to the directory storing all the json files 
     3. copy the following command and press enter 

     `ls -1 *.json | while read jsonfile; do mongoimport -d support -c logs --db wikipedia --collection revisions --file $jsonfile --jsonArray; done`

     4. If importation failed, please check your database name and collections name are correct
         - database name: wikipedia
         - collection name: revisions 