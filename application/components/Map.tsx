"use client";

import { useEffect, useRef } from "react";
import { getMapsLoader } from "@/lib/google";

type MapProps = {
  center?: google.maps.LatLngLiteral;
  marker?: google.maps.LatLngLiteral | null;
  zoom?: number;
};

export default function Map({ center, marker, zoom = 12 }: MapProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapObjRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);

  useEffect(() => {
    let mounted = true;

    getMapsLoader()
      .load()
      .then((google) => {
        if (!mounted || !mapRef.current) return;

        mapObjRef.current = new google.maps.Map(mapRef.current, {
          center: center ?? { lat: -23.2237, lng: -45.9009 }, // São José dos Campos default
          zoom,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
        });

        if (marker) {
          markerRef.current = new google.maps.Marker({
            position: marker,
            map: mapObjRef.current,
          });
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  // Atualiza center/marker quando mudarem
  useEffect(() => {
    if (mapObjRef.current && center) {
      mapObjRef.current.setCenter(center);
      mapObjRef.current.setZoom(zoom);
    }
    if (mapObjRef.current) {
      if (marker) {
        if (!markerRef.current) {
          markerRef.current = new google.maps.Marker({
            position: marker,
            map: mapObjRef.current,
          });
        } else {
          markerRef.current.setPosition(marker);
        }
      } else if (markerRef.current) {
        markerRef.current.setMap(null);
        markerRef.current = null;
      }
    }
  }, [center, marker, zoom]);

  return (
    <div
      ref={mapRef}
      style={{
        width: "100%",
        height: "460px",
        borderRadius: 16,
        border: "1px solid #e5e7eb",
      }}
    />
  );
}
