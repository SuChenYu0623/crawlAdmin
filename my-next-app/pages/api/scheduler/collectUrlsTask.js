let FASTAPI_HOST='127.0.0.1'
let FASTAPI_PORT='8000'


export default async function handler(req, res) {
  // const { workType, press } = req.query;
  // let workType = 'collectUrls'
  // let payload = { workType, press }
  const { payload } = req.body;
  let data = await fetch(`http://${FASTAPI_HOST}:${FASTAPI_PORT}/v1/task/collectUrlsTask/`, {
    "headers": {
      "accept": "*/*",
      "accept-language": "en-US,en;q=0.9",
    },
    "body": JSON.stringify(payload),
    "method": "POST",
    "mode": "cors",
    "credentials": "omit"
  }).then(res => res.json())
    .catch(error => res.status(500).json({ error }))
  res.status(200).json(data)
}