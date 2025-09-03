"use client";

import { useState } from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { useTranslation } from "@/app/i18n/client";

import { Retry } from "@/assets/icons";

const NotFound = () => {
  const router = useRouter();
  const { t } = useTranslation("ko");

  const [isBackHovered, setIsBackHovered] = useState(false);
  const [isHomeHovered, setIsHomeHovered] = useState(false);

  const handleGoBack = () => router.back();
  const handleGoHome = () => router.push("/");

  return (
    <main style={styles.wrapper}>
      <div style={styles.container}>
        <div style={styles.contentRow}>
          <Image src="/images/not_found.svg" alt="404" width={160} height={160} />
          <div style={styles.textCol}>
            <p style={styles.title}>404</p>
            <div style={styles.centered}>
              <p style={styles.subtitle}>
                {t("죄송합니다. 현재 찾을 수 없는 페이지에 접속하셨습니다.")}
              </p>
            </div>
            <div style={styles.descriptionCol}>
              <p style={styles.desc}>{t("삭제되거나 주소가 잘못 입력되었습니다.")}</p>
              <p style={styles.desc}>
                {t("이전 페이지로 돌아가거나, 홈페이지로 이동해 주세요.")}
              </p>
            </div>
          </div>
        </div>
        <div style={styles.buttonRow}>
          <button
            onClick={handleGoBack}
            style={
              isBackHovered ? { ...styles.button, ...styles.buttonHover } : styles.button
            }
            onMouseEnter={() => setIsBackHovered(true)}
            onMouseLeave={() => setIsBackHovered(false)}
          >
            <span style={styles.buttonText}>{t("이전 페이지")}</span>
            <span style={styles.buttonIcon}>
              <Retry />
            </span>
          </button>
          <button
            onClick={handleGoHome}
            style={
              isHomeHovered
                ? { ...styles.buttonOutlined, ...styles.buttonOutlinedHover }
                : styles.buttonOutlined
            }
            onMouseEnter={() => setIsHomeHovered(true)}
            onMouseLeave={() => setIsHomeHovered(false)}
          >
            <span style={styles.buttonText}>{t("dashboard")}</span>
          </button>
        </div>
      </div>
    </main>
  );
};

export default NotFound;

const baseButton: React.CSSProperties = {
  height: "44px",
  padding: "12px 16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  borderRadius: "4px",
  cursor: "pointer",
  fontFamily: "Pretendard, sans-serif",
  whiteSpace: "nowrap",
  transition: "all 0.2s ease-in-out",
};

const styles: { [key: string]: React.CSSProperties } = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    fontFamily: "'Pretendard', sans-serif",
    padding: "0 16px",
  },
  container: {
    width: "616px",
    height: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    alignItems: "center",
  },
  contentRow: {
    display: "flex",
    alignItems: "center",
    gap: "32px",
    width: "100%",
  },
  textCol: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    width: "100%",
  },
  title: {
    color: "#212A4A",
    fontFamily: "Pretendard",
    fontSize: "36px",
    fontWeight: 700,
    lineHeight: "140%",
    margin: 0,
  },
  subtitle: {
    color: "#1F2539",
    fontFamily: "Pretendard",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "160%",
    margin: 0,
  },
  centered: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  descriptionCol: {
    display: "flex",
    flexDirection: "column",
  },
  desc: {
    color: "#73758A",
    fontFamily: "Pretendard",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "160%",
    margin: 0,
  },
  buttonRow: {
    display: "flex",
    width: "229px",
    height: "44px",
    gap: "12px",
  },

  button: {
    ...baseButton,
    backgroundColor: "#EAECF1",
    border: "2px solid #EAECF1",
  },

  buttonHover: {
    backgroundColor: "#DCDFE7",
    border: "2px solid #DCDFE7",
  },

  buttonText: {
    color: "#1F2539",
    textAlign: "center",
    fontFamily: "Pretendard",
    fontSize: "15px",
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "140%",
  },

  buttonIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  buttonOutlined: {
    ...baseButton,
    backgroundColor: "#FFF",
    border: "2px solid #EAECF1",
  },

  buttonOutlinedHover: {
    backgroundColor: "#EFF1F2",
    border: "2px solid #EFF1F2",
  },
};
