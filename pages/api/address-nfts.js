import { retrieveNftsByAddress } from "../../lib/nft-port-api-wrapper";

export default async function handler(req, res) {
  const { query } = req;
  if (!query.hasOwnProperty("address")) {
    res.statusCode = 400;
    res.send({ error: "Missing query parameters" });
  }
  try {
    const response = await retrieveNftsByAddress(req.query.address);
    if (response && response.data) {
      res.statusCode = 200;
      res.json(response);
    } else {
      res.statusCode = 500;
      res.json({ error: "Something went wrong" });
    }
  } catch (error) {
    res.statusCode = 403;
    console.log(error);
    if (error.response.status === 403) {
      res.statusCode = 403;
    }
    res.json({ error });
  }
  res.status(200).json(response);
}
