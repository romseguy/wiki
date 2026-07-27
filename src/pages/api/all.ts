import fs from "fs";
import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import { getSession } from "utils/auth/server";
import { createEndpointError } from "utils/errors";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(async function login(req, res) {
  const prefix = `🚀 ~ ${new Date().toLocaleString()} ~ GET /all `;
  console.log(prefix);

  const session = await getSession({ req });

  if (!session) {
    return res
      .status(401)
      .json(createEndpointError(new Error("Vous devez être identifié.")));
  }

  const client = new MongoClient(process.env.DATABASE_URL);

  try {
    if (!fs.existsSync("topics.json")) {
      await client.connect();
      const database = client.db("assolidaires");
      const collection = database.collection("topics");
      const topics = await collection.find({}).toArray();
      fs.writeFileSync("topics.json", JSON.stringify(topics));
    }

    res.status(200).json({});
  } catch (error) {
    res.status(500).json(createEndpointError(error));
  } finally {
    await client.close();
  }
});

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "100mb",
    },
  },
};

export default router.handler({
  onError: (err: any, req, res) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).end(err.message);
  },
});
