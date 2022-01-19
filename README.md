| Name: | Notification Service |
|:---------|:-------:|
| **Description:** | Notification service provides an API for listing subscribed channels and sending notification to users based on notification type and its channel(s) |
| **Capabilities:**| Sending Notification & Lists subscribe channels |


| **API Endpoints** ||||
|:-------:|:-------:|:-------:|:-------:|
| /notifications | GET | /uid/cid | return collections of subscribed events/channel |
| /notifications | POST | user_id, companyid, notification_type | sends notification to UI channel and subscribe user to event/channel if it has not subscribed |




## Description

Notification microservice

## Installation

```bash
$ yarn
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```
** Change the URI for mongodb in main.ts if running from local, docker should be fine **

## Running the app with docker
```bash
$ docker-compose up dev
```
** Might need to change mongodb ports in docker-compose.yml **

## Test

```bash
# unit tests
$ npm run test
```
