# GeoThing API
A REST-ful API powered by Express and NodeJS, with a MongoDB database and Mongoose ODM.

Current plan is to provide simple CRUD operations on Geocache, User and Log objects.

## Running the GeoThing API
- Ensure you have [NodeJS](https://nodejs.org/en/) installed.
- Install node packages.
`npm install`
- Run the API server.
`node server.js`
- Server defaults to port 8080. Point your browser to "http://localhost:8080/api" to test.

## Documentation
The Geothing API is beautifully documented by generating docs through [apiDoc](https://github.com/apidoc/apidoc).

![](../img/api/api_screenshot.png)

To generate the documentation page, run the following command:  
`apidoc -i routes/ -o docs/`