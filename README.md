# FlatTurtle Drops-web

* Mobile webapp that centralizes everything that's happening around corporate buildings.
* The app first starts out as mobile only. Later it will be adapted to scale to desktop sizes.
* Uses Drops-API

## Development

The idea is to make this a reactjs + redux application that uses the Drops-API as backend. Phases of development:
1. Basic functionality -- Retrieve a building and make use of the service and mobility data
2. User login and registration + problem reporting
3. **TODO**

Development happens in feature branches with merge requests when a feature is finished.
A lot of the current code needs refactoring as it grew from experimentation.

## Dependencies

Install the dependencies with `npm install`. When adding dependencies make sure to update `npm-shrinkwrap.json` (`npm shrinkwrap`).

## Docker
We depend on the Drops-api so first let's make sure we have that running.
Pull Drops-api and follow the Docker instructions from that readme.
* `docker build -t="drops-api:dev" .`
* `docker run --name mongo-drops -d mongo`
* `docker run --name drops-api --link mongo-drops:mongo -p 12345:3000 -d drops-api:dev`

Then let's build and start drops-web:

* `docker build -t="drops-web:dev" .`
* `docker run --name drops-web --link drops-api:api -p 8080:8080 -d drops-web:dev`
