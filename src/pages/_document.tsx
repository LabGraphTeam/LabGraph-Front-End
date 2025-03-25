import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  const setThemeScript = `
    (function() {
      try {
        const theme = localStorage.getItem('theme');
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      } catch (error) {
        console.warn('Error applying theme:', error);
      }
    })();
  `

  return (
    <Html lang='en-US'>
      <Head />

      <body className=''>
        <Main />
        <NextScript />
        <script
          dangerouslySetInnerHTML={{
            __html: setThemeScript
          }}
        />
      </body>
    </Html>
  )
}
