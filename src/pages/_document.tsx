import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <meta name='theme-color' content='#121212' />
        <link rel='manifest' href='/manifest.json' />
        <link rel='icon' type='image/svg+xml' href='/favicon.svg' />
        <link rel='apple-touch-icon' href='/favicon.svg' />
      </Head>
      <body>
        <a className='skip-link' href='#content'>
          Skip to content
        </a>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
