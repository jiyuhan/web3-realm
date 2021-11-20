import { getHistoricalPortfolioValue } from "../../lib/covalent-api-wrapper";
import { isValidEthAddress } from "../../util/string-validators";
// TODO: add logging and error handling
export default async function handler(req, res) {
  const { query } = req;
  if (!query) {
    res.status(400).send("Missing query parameters");
  }

  const response =
    query.hasOwnProperty("address") && isValidEthAddress(query.address)
      ? await getHistoricalPortfolioValue(req.query.address)
      : { data: "no data" };

  console.log("portfolio value", JSON.stringify(response));
  res.status(200).json(response);
}
