import { Storage } from '@google-cloud/storage';
const storage = new Storage({
  projectId: process.env.PROJECT_ID,
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY,
  },
});

// TODO: throw errors if env variables do not exist
const bucket = storage.bucket(process.env.BUCKET_NAME!);

export default bucket;
