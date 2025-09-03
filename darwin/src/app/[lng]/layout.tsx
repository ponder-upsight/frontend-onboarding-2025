"use client"

import { ReactNode, use } from "react"
import dynamic from "next/dynamic"
import { Global } from "@emotion/react"
import { dir } from "i18next"
import { toastStyles } from "../components/ui/Toast/toastStyles"
import I18nProvider from "../i18n/I18nProvider"
import { ChakraLayoutProvider, QueryProviders } from "../providers"
import Header from "./components/Header/Header"

interface LayoutProps {
  children: ReactNode
  params: Promise<{
    lng: string
  }>
}

const DynamicToastContainer = dynamic(
  () => import("react-toastify").then((mod) => mod.ToastContainer),
  { ssr: false }
)

const Layout = ({ children, params }: LayoutProps) => {
  const { lng } = use(params)
  return (
    <div dir={dir(lng)} style={{ height: "100%", position: "static", zIndex: 99 }}>
      <Global styles={toastStyles} />
      <DynamicToastContainer closeButton={false} autoClose={false} />
      <QueryProviders>
        <ChakraLayoutProvider>
          <I18nProvider lng={lng}>
            <Header />
            {children}
          </I18nProvider>
        </ChakraLayoutProvider>
      </QueryProviders>
    </div>
  )
}

export default Layout
