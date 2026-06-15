"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="es">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          padding: "0 1.5rem",
          textAlign: "center",
          backgroundColor: "#ffffff",
          color: "#21402d",
          fontFamily: "'Big Caslon', 'Baskerville', 'Palatino Linotype', serif"
        }}
      >
        <p
          style={{
            fontSize: "0.75rem",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#b89a4a",
            margin: 0
          }}
        >
          Error
        </p>
        <h1 style={{ fontSize: "2.5rem", margin: 0 }}>
          Algo salió mal
        </h1>
        <p style={{ maxWidth: "28rem", fontSize: "0.9rem", lineHeight: 1.7, color: "#516154" }}>
          Ocurrió un error inesperado. Por favor recarga la página.
        </p>
        <button
          type="button"
          onClick={reset}
          style={{
            marginTop: "0.5rem",
            border: "none",
            borderRadius: "9999px",
            backgroundColor: "#b89a4a",
            color: "#21402d",
            padding: "0.625rem 1.5rem",
            fontSize: "0.875rem",
            fontWeight: 600,
            cursor: "pointer"
          }}
        >
          Recargar
        </button>
      </body>
    </html>
  );
}
