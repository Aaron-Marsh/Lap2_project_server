# Lap2_project_server
# Rabbit Habits

## Installation & Usage
Client runs on https://rabbit-habits.netlify.app/ with a backend deployed on Heroku

To run a local version of the server:
- Clone repo and cd to `Lap2_project_server`
- Run `docker compose up`
- Server runs on localhost:3000
- Close server with `docker compose down -v`

## Technologies
- MongoDB
- Atlas
- Heroku
- Bcryptjs
- Express
- Jest
- Supertest

## Process
- Started on localhost then deployed to heroku through Atlas

## Wins and Challenges
### Wins
- Got desired functionality to work
- Implemented authorisation with hashed passwords
- Allowed daily, weekly, and monthly habits

### Challenges
- Testing was difficult to set up
- Deploying server through atlas and heroku took time

## Contribution Guide
- Server and database - Mostly Aaron
- Atlas - Aaron
- Heroku - Group effort
- Serverside testing - Gio and Aaron

All Contributors:

Aaron, Billie, Gio, Tom

## Bugs
- When testing, could not get refreshing database on each new test to work

## Future Features
- Add a freeze streaks feature for if user wants a break
- Could add calander of progress

## Licence
MIT Licence
