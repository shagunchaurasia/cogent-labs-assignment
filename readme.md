Thumbnail Generator

There can be two ways to build this that come to mind. I chose the second approach to implement this on local using docker-compose.

1) Aws Approach - We can have two buckets (source bucket and destination bucket). Source bucket can have an event trigger attached to it. Lambda can be triggered based on the event and it can generate the thumbnail and place it in destination bucket. Since it can be an asynchronous task, api gateway will return a success/failure based on the upload of image and rest of the tasks can be handled in background.

2) Bull Redis approach with Express - I have previously used bull queue and it performs well with Redis to implement queues with Nodejs and help with background tasks. The structure for this approach is mentioned.


Plugins used:
1) bull - To implement queue in nodejs 
2) multer - To upload file/files (In this project you can upload multiple files together)
3) sharp - To generate thumbnails of size provided
