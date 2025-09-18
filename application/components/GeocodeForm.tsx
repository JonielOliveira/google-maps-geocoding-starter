"use client";

import { useState } from "react";
import type { GeocodingResult } from "@/types/geocoding";

type Props = {
  onResult: (result: GeocodingResult) => void;
};

export default function GeocodeForm({ onResult }: Props) {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    if (!address.trim()) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/geocode?address=${encodeURIComponent(address)}`);
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Erro ao geocodificar");
      }
      const data = (await res.json()) as GeocodingResult;
      onResult(data);
    } catch (error: any) {
      setErr(error.message || "Falha ao geocodificar.");
    } finally {
      setLoading(false);
    }
  }

  async function useMyLocation() {
    setErr(null);
    if (!navigator.geolocation) {
      setErr("Geolocalização não suportada no navegador.");
      return;
    }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const res = await fetch(`/api/geocode?lat=${latitude}&lng=${longitude}`);
          if (!res.ok) throw new Error("Erro no reverse geocoding");
          const data = (await res.json()) as GeocodingResult;
          onResult(data);
        } catch (e: any) {
          setErr(e.message || "Falha ao obter endereço pela localização.");
        } finally {
          setLoading(false);
        }
      },
      (geErr) => {
        setLoading(false);
        setErr(geErr.message || "Falha na geolocalização.");
      }
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 8 }}>
      <label style={{ fontWeight: 600 }}>Endereço para geocodificar</label>
      <input
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Ex.: Av. Paulista, 1000, São Paulo"
        style={{
          padding: "10px 12px",
          borderRadius: 10,
          border: "1px solid #d1d5db",
        }}
      />
      <div style={{ display: "flex", gap: 8 }}>
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "10px 14px",
            borderRadius: 10,
            border: "1px solid #111827",
            background: "#111827",
            color: "white",
            cursor: "pointer",
          }}
        >
          {loading ? "Geocodificando..." : "Geocodificar"}
        </button>
        <button
          type="button"
          onClick={useMyLocation}
          disabled={loading}
          style={{
            padding: "10px 14px",
            borderRadius: 10,
            border: "1px solid #6b7280",
            background: "white",
            color: "#111827",
            cursor: "pointer",
          }}
        >
          Usar minha localização
        </button>
      </div>
      {err && <p style={{ color: "#b91c1c" }}>{err}</p>}
    </form>
  );
}
