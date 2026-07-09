import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { AuthProvider } from '../components/AuthContext';
import { ThemeProvider } from '../components/ThemeContext';
import { I18nProvider } from '../components/I18nContext';
import AuthModal from '../components/AuthModal';
import { GoogleOAuthProvider } from '@react-oauth/google';

export const metadata: Metadata = {
  title: 'PixelGamez — Free Online Games',
  description: 'Play free online games at PixelGamez. Browse hundreds of high-quality browser games across action, puzzle, racing, and more.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const adSenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/images/logo/PixelGamezLogoNoBackround.png" type="image/png" />
        <link rel="apple-touch-icon" href="/images/logo/PixelGamezLogoNoBackround.png" />
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-P3R9BX7H');
          `}
        </Script>
      </head>
      <body suppressHydrationWarning>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-P3R9BX7H"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || 'dummy_client_id_please_configure_in_env'}>
          <I18nProvider>
            <AuthProvider>
            <ThemeProvider>
              <div id="app">
                <div id="app-header">
                  <Header />
                </div>
                <div id="app-sidebar">
                  <Sidebar />
                </div>
                <main id="app-main">
                  <div id="app-content">
                    {children}
                  </div>
                </main>
              </div>
              <AuthModal />
            </ThemeProvider>
          </AuthProvider>
          </I18nProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
