import { Space } from 'src/types';
import axiosInstance from 'src/core/axios';
import keyBy from 'lodash.keyby';

type Response = {
  spaces: Space[];
};

export async function getSpaces(): Promise<Record<string, Space>> {
  const response = await axiosInstance.get<Response>('/api/clickup-proxy', {
    params: {
      endpoint: `https://api.clickup.com/api/v2/team/${process.env.NEXT_PUBLIC_TEAM_ID}/space`
    }
  });

  return keyBy(response.data?.spaces, 'id');
}
