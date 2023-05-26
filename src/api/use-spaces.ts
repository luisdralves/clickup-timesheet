import { Space } from 'src/types';
import { UseQueryOptions, UseQueryResult, useQuery } from '@tanstack/react-query';

import { getSpaces } from './get-spaces';

type Options = UseQueryOptions<Record<string, Space>, unknown, Record<string, Space>, string[]>;

type Result = UseQueryResult<Record<string, Space>>;

export function useSpaces(options?: Options): Result {
  return useQuery(['spaces'], getSpaces, options);
}
