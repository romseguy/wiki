import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import { createEndpointError } from "utils/errors";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(async function getTopics(req, res) {
  const prefix = `🚀 ~ ${new Date().toLocaleString()} ~ GET /topics `;
  console.log(prefix);

  const client = new MongoClient(process.env.DATABASE_URL);

  try {
    await client.connect();
    const database = client.db("assolidaires");
    const collection = database.collection("topics");
    let topics = await collection.find({}).toArray();
    console.log(prefix, topics.length);
    res.status(200).json(topics);
  } catch (error) {
    res.status(500).json(createEndpointError(error));
  } finally {
    await client.close();
  }
});

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "50mb",
    },
    responseLimit: "80mb",
  },
};

export default router.handler({
  onError: (err: any, req, res) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).end(err.message);
  },
});
