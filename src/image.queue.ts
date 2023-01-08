import { DoneCallback, Job } from "bull";
import Bull from "bull";
import sharp from 'sharp';


const ImageQueue = new Bull(
  "image-queue",
  process.env.REDIS_URL ?? "localhost:6739"
);

const addToQueue = async (data:any) => {
  const promises = data.map((jobDetails: Job) => {
    ImageQueue.add(jobDetails,{attempts: 5});
  });

  await Promise.all(promises);
};

ImageQueue.process(async (job: Job, done: DoneCallback) => {
  await createThumbnail(job.data);
  done();
});

const createThumbnail = (data: {filename:string; path:string}) => {
  return new Promise((resolve, reject) => {
    sharp(data.path)
      .resize({ width: 100, height: 100, fit: "inside" })
      .toFile("thumbnails/" + data.filename, (error: any) => {
        if (error) {
          reject(error);
        } else {
          return resolve("complete");
        }
      });
  });
};

ImageQueue.on("completed", (job: Job) => {
  console.log(`Image Thumbnail Generated at thumbnails/${job.data.filename}`);
});

export default addToQueue;
