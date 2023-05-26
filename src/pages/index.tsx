import { ApiKeyForm } from 'src/components/api-key-form';
import { NextPage } from 'next';
import { Spin, message } from 'antd';
import { TimesheetTable } from 'src/components/timesheet-table';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';

const IndexPage: NextPage = () => {
  const [hasApiKey, setHasApiKey] = useState<boolean>();
  const [messageApi, contextHolder] = message.useMessage();
  const handleError = useCallback(
    (error: unknown) => {
      messageApi.error(String(error));
      setHasApiKey(false);
      destroyCookie(null, 'apiKey');
    },
    [messageApi]
  );

  useEffect(() => {
    setHasApiKey(!!parseCookies().apiKey);
  }, []);

  return (
    <>
      <Head>
        <title>{'Clickup Timesheet'}</title>
      </Head>

      {contextHolder}

      {hasApiKey === undefined && <Spin />}

      {hasApiKey === false && (
        <ApiKeyForm
          onFinish={({ apiKey }) => {
            setCookie(null, 'apiKey', apiKey);
            setHasApiKey(true);
          }}
        />
      )}

      {hasApiKey && <TimesheetTable onError={handleError} />}
    </>
  );
};

export default IndexPage;
