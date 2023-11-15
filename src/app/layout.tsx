import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google';
import { getServerSession } from 'next-auth';
import ToasterContext from './context/ToasterContext';
import AuthContext from './context/AuthContext';
import ActiveStatus from './components/ActiveStatus';
import AppContainer from './components/AppContainer';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Messenger',
  description: 'Messenger',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContext session={session}>
          <ToasterContext />
          <ActiveStatus />
          <AppContainer>
            {children}
          </AppContainer>
        </AuthContext>
      </body>
    </html>
  )
}
