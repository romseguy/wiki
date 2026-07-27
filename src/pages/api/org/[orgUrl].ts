import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import { createEndpointError } from "utils/errors";
import { logJson } from "utils/string";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(async function getOrg(req, res) {
  let {
    query: { orgUrl, hash, populate = "" },
  } = req;

  const prefix = `🚀 ~ ${new Date().toLocaleString()} ~ GET /org/${orgUrl} `;
  console.log(prefix);

  const client = new MongoClient(process.env.DATABASE_URL);

  try {
    await client.connect();
    const database = client.db("assolidaires");
    const collection = database.collection("orgs");
    let org = await collection.findOne({ orgUrl });
    if (!org)
      return res
        .status(404)
        .json(
          createEndpointError(
            new Error(`L'organisation ${orgUrl} n'a pas pu être trouvé`),
          ),
        );

    logJson(prefix, org);
    res.status(200).json(org);
  } catch (error: any) {
    if (error.kind === "ObjectId")
      return res
        .status(404)
        .json(
          createEndpointError(
            new Error(`L'organisation ${orgUrl} n'a pas pu être trouvé`),
          ),
        );
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
    responseLimit: "8mb",
  },
};

export default router.handler({
  onError: (err: any, req, res) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).end(err.message);
  },
});
