import { isValidEthAddress } from "../../util/string-validators";
// TODO: add logging and error handling
export default async function handler(req, res) {
  const { query } = req;
  if (!query) {
    res.status(400).send("Missing query parameters");
  }

  const response =
    query.hasOwnProperty("address") &&
    query.hasOwnProperty("contract_address") &&
    isValidEthAddress(query.address) &&
    isValidEthAddress(query.contract_address)
      ? await getTxsForAddress(req.query.address, req.query.contract_address)
      : { data: "no data" };

  console.log(JSON.stringify(query));
  res.status(200).json(response);
}
