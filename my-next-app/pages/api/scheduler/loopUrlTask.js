let FASTAPI_HOST='127.0.0.1'
let FASTAPI_PORT='8000'

export default async function handler(req, res) {
  const { payload } = req.body;
  // const { size } = req.query;
  // let payload = await fetch(`http://${FASTAPI_HOST}:${FASTAPI_PORT}/v1/data/newsUrls/?size=${size}`)
  //   .then(res => res.json())
  //   .then(taskUrls => ({
  //     workType: 'loopUrl',
  //     taskUrls: taskUrls
  //   }))
  //   .catch((error) => res.status(500).json({ error }))

  let data = await fetch(`http://${FASTAPI_HOST}:${FASTAPI_PORT}/v2/task/loopUrlTask/`, {
    "headers": {
      "accept": "*/*",
      "accept-language": "en-US,en;q=0.9",
    },
    "body": payload,
    "method": "POST",
    "mode": "cors",
    "credentials": "omit"
  }).then(res => res.json())
    .catch((error) => res.status(500).json({ error }))

  res.status(200).json(data)
}