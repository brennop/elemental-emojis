import axios from "axios";

module.exports = (req, res) => {
  const { headers, params } = req;

  const url = "https://elementalemojis.goatcounter.com/count";

  console.log("Couting view");

  axios
    .get(url, { headers, params })
    .then((response) => res.send(response.data))
    .catch(console.error);
};
