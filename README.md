# Rhythmic Machine
A simple mobile-friendly drum machine that is capable of playing back in-built rhythmic patterns to inspire the user. 

 ## Description 
  Begin the pattern playback by just pressing the play button. Or create your own rhythms by tapping on the virtual pads in real-time.
  * Each time a pad is pressed, it makes a sound, making it into a finger tapping drum machine.
  * If the pad is "on", it will play that sound in a sequence when the pattern is played back.
  * Select other patterns from the dropdown menu.
  * Mobile-friendly in landscape orientation. 

---
| Table of Contents |
|---|
| [User Story](#UserStory) |
| [Functionality](#Functionality) |
| [Contribution](#Contribution) |
| [Front End Tech](#FrontEndTech) |
| [Back End Tech](#BackEndTech) |
| [Concept](#Concept) |
| [License](#License) |
| [Links](#Links) |
---

## Contribution
The code is based on other examples of React based drum machines, predominantly Joe Selfi’s [React-808](https://github.com/joeshub/react-808) which in turn was further developed by Rob Brennan.
A MongoDB-linked dropdown menu was added to recall patterns. Some CSS was enhanced on the original and th
Use of the use-sound npm package was added to allow for future developments.

## User Story
As a musician, I would like to quickly create and hear a rhythmic pattern I have in my head.

As a musician, I would like to have an simple drum machine to keep time during practice.

As a musician, I would like my mobile phone to provide examples of rhythms that I cannot play myself.

## Functionality 
* Data is retrieved from the database on load and passed into React for the pattern to render.
* Front end and back end communicate via axios, API and HTML routes.
* CRUD best practices followed.
* HTML generated with React using custom layout from Joe Selfi’s React-808.
* Deployed to Heroku and database deployed to MongoDB Atlas. 
* Model View Controller Design Pattern.
 

## Front End Tech
* React
* Bootstrap
* HTML
* CSS
* JavaScript 

## Back End Tech
* Node.js 
* MongoDB
* Heroku
* Express
* use-sound npm
* classname npm
* JavaScript 

## Concept
* Figma
* Github
* Trello
* Slack

## License 

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


## Links
### Github Repository
https://github.com/blakestickland/rhythmic-machine

### Deployed App
https://dry-journey-82163.herokuapp.com/

### Screenshot

Rhtymic Machine Single Page App

![rhythmic-machine-single-page-app](https://user-images.githubusercontent.com/73763708/117811950-858e2c80-b2a4-11eb-8ab0-31abc3cb31db.png)
