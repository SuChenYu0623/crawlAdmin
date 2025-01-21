let FASTAPI_HOST='127.0.0.1'
let FASTAPI_PORT='8000'

export default async function handler(req, res) {
  const { size } = req.query;
  let payload = await fetch(`http://${FASTAPI_HOST}:${FASTAPI_PORT}/v1/data/newsUrls/?size=${size}`)
    .then(res => res.json())
    .then(taskUrls => ({
      workType: 'loopUrl',
      taskUrls: taskUrls
    }))
    .catch((error) => res.status(500).json({ error }))

  res.status(200).json(payload)
}