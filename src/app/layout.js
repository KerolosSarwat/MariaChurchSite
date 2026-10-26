import './globals.css';
import { ToastProvider } from '../components/ToastProvider';
import { AppConfigProvider } from '../components/AppConfigProvider';
import { AuthProvider } from '../components/AuthProvider';
import AppShell from '../components/AppShell';

export const metadata = {
  title: 'كنيسة السيدة العذراء والشهيد أبانوب',
  description: 'المناهج التعليمية الأرثوذكسية المقررة ومواعيد القداسات الإلهية وخدمات الكنيسة.',
  icons: {
    icon: [
      { url: '/logo_icon.jpg', type: 'image/jpeg' },
      { url: '/favicon.ico' },
    ],
    shortcut: '/logo_icon.jpg',
    apple: '/logo_icon.jpg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="icon" href="/logo_icon.jpg" type="image/jpeg" />
        <link rel="shortcut icon" href="/logo_icon.jpg" type="image/jpeg" />
        <link rel="apple-touch-icon" href="/logo_icon.jpg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Fira+Code:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link
          rel="preload"
          href="/fonts/Avva_Shenouda.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <AppConfigProvider>
          <ToastProvider>
            <AuthProvider>
              <AppShell>{children}</AppShell>
            </AuthProvider>
          </ToastProvider>
        </AppConfigProvider>
      </body>
    </html>
  );
}
