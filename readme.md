# Thumbnail Generator

There can be two ways to build this that come to mind. I chose the second approach to implement this on local using docker-compose.

1. **Aws Approach** - We can have two buckets (source bucket and destination bucket). Source bucket can have an event trigger attached to it. Lambda can be triggered based on the event and it can generate the thumbnail and place it in destination bucket. Since it can be an asynchronous task, api gateway will return a success/failure based on the upload of image and rest of the tasks can be handled in background.

2. **Bull Redis approach with Express** - I have previously used bull queue and it performs well with Redis to implement queues with Nodejs and help with background tasks. The structure for this approach is mentioned.

# Plugins used:

1. **bull** - bull is a popular package for creating and managing job queues in Node.js. 
bull has a number of features that make it a good choice for creating job queues - It is built on top of the popular redis in-memory data store, which allows it to scale horizontally across multiple machines.
2. **multer** - To upload file/files (In this project you can upload multiple files together)
3. **sharp** - To generate thumbnails of size provided


# Installation steps:
Everything is maintained with docker-compose. Please make sure ports 5001, 6379 and 8081 are available on your system.

To bring up the service:
**docker-compose up --build**

To monitor the queues in bull **[Redis Bull](http://localhost:8081/)**
To check the output please check folder "thumbnails" inside the project. Docker volume folder has been mapped to the local folder to see the output results that happen in background after files have been queued.

To run the test cases:
**docker compose run backend npm run test**

Test Cases Considered:
I have not considered all test cases. Few of the considered test cases are:
1) hello api to check the service
2) upload single file 
3) if no file is attached
4) multiple files upload - I have tested it with around 100 uploads, bull seems to be working well. Even if service gets interrupted retries are made.



# Deployment Process:
There are many ways to deploy this application, and the best approach will depend on more specific needs and constraints. 

Deploying to aws cloud platform: This can use Amazon Elastic Container Service (ECS) to run the application in a Docker container.

Deploying to a virtual private server (VPS): It can also bde deployed to a VPS, such as a DigitalOcean server. This requires setting up and configuring the VPS but it can be a good option if we need more control over the environment.

Deploying to a container orchestrator: Docker swarm or Kubernetes can be used to deploy the application as well but it depends on how huge of a scale is needed.


****
### Contributor : Shagun Chaurasia (chaurasia.shagun@gmail.com)


