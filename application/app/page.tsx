"use client";

import { useState } from "react";
import Map from "@/components/Map";
import GeocodeForm from "@/components/GeocodeForm";
import type { GeocodingResult } from "@/types/geocoding";

export default function HomePage() {
  const [result, setResult] = useState<GeocodingResult | null>(null);

  return (
    <main
      style={{
        maxWidth: 960,
        margin: "40px auto",
        padding: "0 16px",
        display: "grid",
        gap: 16,
      }}
    >
      <h1 style={{ fontSize: 28, fontWeight: 800 }}>
        Google Maps + Geocoding • Teste de Integração
      </h1>

      <p style={{ color: "#374151" }}>
        Este app carrega o <b>Maps JavaScript API</b> no navegador e usa uma rota
        de API para chamar a <b>Geocoding API</b> no servidor. Insira um endereço
        ou use sua localização para ver o marcador no mapa.
      </p>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.2fr",
          gap: 16,
          alignItems: "start",
        }}
      >
        <div
          style={{
            padding: 16,
            border: "1px solid #e5e7eb",
            borderRadius: 16,
            background: "white",
          }}
        >
          <GeocodeForm onResult={setResult} />

          {result && (
            <div style={{ marginTop: 16 }}>
              <h3 style={{ fontWeight: 700 }}>Resultado</h3>
              <p style={{ margin: "8px 0" }}>
                <b>Endereço:</b> {result.formatted_address}
              </p>
              <p style={{ margin: "4px 0" }}>
                <b>Lat:</b> {result.location.lat.toFixed(6)} •{" "}
                <b>Lng:</b> {result.location.lng.toFixed(6)}
              </p>
              <p style={{ margin: "4px 0", color: "#6b7280" }}>
                <b>place_id:</b> {result.place_id}
              </p>
            </div>
          )}
        </div>

        <Map
          center={result?.location}
          marker={result?.location ?? null}
          zoom={result ? 16 : 12}
        />
      </section>

      <footer style={{ color: "#6b7280", fontSize: 12 }}>
        Lembre-se de habilitar billing no Google Cloud e **restringir** suas chaves.
      </footer>
    </main>
  );
}
