import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Product Management System',
  description: '상품 관리 시스템',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}
