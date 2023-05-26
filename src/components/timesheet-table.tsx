import { Table as BaseTable, Spin } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Task } from 'src/types';
import { css } from '@emotion/react';
import { formatTimeSpan } from 'src/core/utils/format';
import { useMemo } from 'react';
import { useSpaces } from 'src/api/use-spaces';
import { useTimeEntries } from 'src/api/use-time-entries';
import styled from '@emotion/styled';
import times from 'lodash.times';

type Props = {
  onError: (error: unknown) => void;
};

type Row = {
  perDay: number[];
  task: Task | string;
  total: number;
};

type TimesByTask = Record<string, Row>;

const days = 31;

const TaskLink = styled.a`
  display: block;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const PerDay = styled.span<{ isEmpty?: boolean }>`
  ${({ isEmpty }) => css`
    /* stylelint-disable-next-line color-hex-length */
    color: #000${isEmpty ? '2' : 'f'};
  `}
`;

const Main = styled.main`
  max-height: 100vh;
  max-width: 100vw;
  overflow: hidden;
`;

const Table = styled(BaseTable)`
  margin: 16px;

  tbody > tr > td:first-child {
    padding: 8px 16px !important;
  }

  tbody > tr:first-child > td:first-child {
    padding: 0 !important;
  }
` as unknown as typeof BaseTable;

function useColumns(today: Date, onError: Props['onError']) {
  const { data: spaces, isLoading } = useSpaces({ onError });
  const dayColumns: ColumnsType<Row> = useMemo(
    () =>
      times(days, index => {
        const date = new Date(today.getTime() - (days - 1 - index) * 24 * 60 * 60 * 1000);

        return {
          align: 'right',
          dataIndex: ['perDay', days - 1 - index],
          ellipsis: true,
          render: (total: number) => <PerDay isEmpty={total === 0}>{formatTimeSpan(total)}</PerDay>,
          textWrap: 'word-break',
          title: (
            <>
              {`${date.getDate()}/${String(date.getMonth() + 1).padStart(2, '0')}`}

              <br />

              {date.toDateString().split(' ')[0]}
            </>
          )
        };
      }),
    [today]
  );

  const columns: ColumnsType<Row> = useMemo(
    () => [
      {
        dataIndex: 'task',
        fixed: 'left',
        render: (task: Task | string) => {
          if (typeof task === 'string') {
            return task;
          }

          const space = task.space_id && spaces?.[task.space_id];

          return (
            <>
              {isLoading ? (
                <Spin />
              ) : (
                space && (
                  <TaskLink
                    href={`https://app.clickup.com/${process.env.NEXT_PUBLIC_TEAM_ID}/v/s/${space.id}`}
                  >
                    {space.name}
                  </TaskLink>
                )
              )}

              <TaskLink href={task.url}>{task.name}</TaskLink>
            </>
          );
        },
        title: 'Task',
        width: 232
      },
      {
        align: 'right',
        dataIndex: 'total',
        fixed: 'left',
        render: formatTimeSpan,
        title: 'Total',
        width: 120
      },
      ...dayColumns
    ],
    [dayColumns, isLoading, spaces]
  );

  return columns;
}

export const TimesheetTable = ({ onError }: Props) => {
  const today = useMemo(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    return now;
  }, []);

  const columns = useColumns(today, onError);
  const { data, isLoading } = useTimeEntries({ onError });
  const rows = useMemo(() => {
    const timesByTask: TimesByTask = {};
    data?.forEach(timeEntry => {
      const daysAgo = Math.floor(
        (today.getTime() - new Date(Number(timeEntry.start)).setHours(0, 0, 0, 0)) /
          (24 * 60 * 60 * 1000)
      );

      if (!timesByTask[timeEntry.task.id]) {
        timesByTask[timeEntry.task.id] = {
          perDay: times(days, () => 0),
          task: {
            ...timeEntry.task,
            // eslint-disable-next-line id-match
            space_id: timeEntry.task_location.space_id,
            url: timeEntry.task_url
          },
          total: 0
        };
      }

      timesByTask[timeEntry.task.id].total += Number(timeEntry.duration);
      timesByTask[timeEntry.task.id].perDay[daysAgo] += Number(timeEntry.duration);
    });

    const perDay = times(days, () => 0);
    let total = 0;
    const rows = Object.values(timesByTask);

    rows.forEach(row =>
      row.perDay.forEach((value, index) => {
        perDay[index] += value;
        total += value;
      })
    );

    return [{ perDay, task: 'Total', total }, ...rows];
  }, [data, today]);

  return (
    <Main>
      <Table
        columns={columns}
        dataSource={rows}
        loading={isLoading}
        pagination={false}
        scroll={{ x: 232 + 120 + days * 80, y: '75vh' }}
        style={{ margin: 16 }}
      />
    </Main>
  );
};
