import { NextApiRequest, NextApiResponse } from 'next';
import axiosInstance from 'src/core/axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const response = await axiosInstance.get<Response>(req.query.endpoint as string, {
    headers: {
      Authorization: req.cookies.apiKey as string
    }
  });

  res.status(response.status).json(response.data);
}
