import { TimeEntry } from 'src/types';
import axiosInstance from 'src/core/axios';

type Response = {
  data: TimeEntry[];
};

export async function getTimeEntries(): Promise<TimeEntry[]> {
  const response = await axiosInstance.get<Response>('/api/clickup-proxy', {
    params: {
      endpoint: `https://api.clickup.com/api/v2/team/${process.env.NEXT_PUBLIC_TEAM_ID}/time_entries`
    }
  });

  return response.data?.data;
}
