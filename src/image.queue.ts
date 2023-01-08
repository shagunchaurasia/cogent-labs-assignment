import { Job } from "bull";
const Queue = require("bull");
const sharp = require("sharp");

const ImageQueue = new Queue(
  "image-queue",
  process.env.REDIS_URL ?? "localhost:6739"
);

const addToQueue = async (data: any) => {
  const promises = data.map((jobDetails: Job) => {
    ImageQueue.add(jobDetails);
  });

  await Promise.all(promises);
};

ImageQueue.process(async (job: Job, done: any) => {
  await createThumbnail(job.data);
  done();
});

const createThumbnail = (data: any) => {
  return new Promise((resolve, reject) => {
    sharp(data.path)
      .resize({ width: 100, height: 100 })
      .toFile("thumbnails/" + data.filename, (error: any, info: any) => {
        if (error) {
          reject(error);
        } else {
          return resolve("complete");
        }
      });
  });
};

ImageQueue.on("completed", (job: Job, result: any) => {
  console.log(job, result)
  console.log("Image Thumbnail Generated");
  console.log(job.data.path)
});

export default addToQueue;
