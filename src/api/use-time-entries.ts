import { TimeEntry } from 'src/types';
import { UseQueryOptions, UseQueryResult, useQuery } from '@tanstack/react-query';

import { getTimeEntries } from './get-time-entries';

type Options = UseQueryOptions<TimeEntry[], unknown, TimeEntry[], string[]>;

type Result = UseQueryResult<TimeEntry[]>;

export function useTimeEntries(options?: Options): Result {
  return useQuery(['time-entries'], getTimeEntries, options);
}
