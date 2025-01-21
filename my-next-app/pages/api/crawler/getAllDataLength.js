const HOST = '127.0.0.1'
const PORT = '8000'

export default async function handler(req, res) {
  let data = await fetch(`http://${HOST}:${PORT}/v1/data/newsItems/all_length`)
    .then(res => res.json())
  res.status(200).json(data)
}