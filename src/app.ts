import express, { Request } from "express";
import bodyParser from "body-parser";
import multer, { FileFilterCallback } from "multer";
import addToQueue from "./image.queue";
import { DestinationCallback, FileNameCallback } from "./types/types";

const app = express();
app.use(bodyParser.json());
const PORT = process.env.PORT ?? 5001;

const fileStorage = multer.diskStorage({
  destination: (
    request: Request,
    file: Express.Multer.File,
    callback: DestinationCallback
  ) => {
    callback(null, "uploads");
  },

  filename: (
    req: Request,
    file: Express.Multer.File,
    callback: FileNameCallback
  ) => {
    callback(null, Date.now() + file.originalname.replace(/\s/g, "_"));
  },
});

const fileFilter = (
  request: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback
): void => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

const upload = multer({ storage: fileStorage, fileFilter: fileFilter });

app.get("/hello", (request, response) => {
  response.status(200).send("Hello from Application");
});

app.post("/upload", upload.array("images"), async (request, response) => {
  if (request.files === undefined) {
    return response.status(400).send(
      "Files not attached. Please check the request",
    );
  }
  console.log(request.files)
  if (request.files?.length == 0) {
    return response.status(500).send(
      "File not uploaded. Please check the format",
    );
  }
  await addToQueue(request.files);
  const filesQueued = request?.files?.length ?? "";
  return response.status(200).send(`${filesQueued} files queued`);
});

app.listen(PORT, () => console.log("Application running on port ", PORT));

export default app;
