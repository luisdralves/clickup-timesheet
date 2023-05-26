import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang={'en'}>
      <Head>
        <link href={'/clickup.svg'} rel={'icon'} type={'image/svg+xml'} />
      </Head>

      <body>
        <Main />

        <NextScript />
      </body>
    </Html>
  );
}
