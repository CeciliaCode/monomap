import express from 'express'
import 'dotenv/config';
import { envs } from './config/envs.plugin';
import { MongoDatabase } from './data/init';
import { AppRoutes } from './controllers/routes';
import { emailJob } from './domain/jobs/email.job';

const app = express();
app.use(express.json());
app.use(AppRoutes.routes);

(async () => {
  await MongoDatabase.connect({ mongoUrl: envs.MONGO_URL ?? "", dbName: "MonoMap" });
})();

app.listen(envs.PORT, () => {
  console.log("Server started.")
  emailJob();
})