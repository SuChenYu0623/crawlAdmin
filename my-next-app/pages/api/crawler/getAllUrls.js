const HOST = '127.0.0.1'
const PORT = '8000'

export default async function handler(req, res) {
  const { size } = req.query;
  let data = await fetch(`http://${HOST}:${PORT}/v1/data/newsUrls/all?size=${size}`)
    .then(res => res.json())
  res.status(200).json(data)
}