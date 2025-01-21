// pages/api/hello.js
export default function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      // 处理 GET 请求
      res.status(200).json({ message: 'This is a GET request' });
      break;

    case 'POST':
      // 处理 POST 请求
      res.status(200).json({ message: 'This is a POST request' });
      break;

    case 'PUT':
      // 处理 PUT 请求
      res.status(200).json({ message: 'This is a PUT request' });
      break;

    case 'DELETE':
      // 处理 DELETE 请求
      res.status(200).json({ message: 'This is a DELETE request' });
      break;

    default:
      // 方法不被支持
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
