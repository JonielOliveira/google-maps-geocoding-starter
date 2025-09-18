import { NextResponse } from "next/server";

const GEOCODE_BASE = "https://maps.googleapis.com/maps/api/geocode/json";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const address = url.searchParams.get("address");
  const lat = url.searchParams.get("lat");
  const lng = url.searchParams.get("lng");
  const key = process.env.GOOGLE_GEOCODING_API_KEY;

  if (!key) {
    return new NextResponse("Missing GOOGLE_GEOCODING_API_KEY", { status: 500 });
  }

  let endpoint = `${GEOCODE_BASE}?key=${encodeURIComponent(key)}`;

  if (address) {
    endpoint += `&address=${encodeURIComponent(address)}`;
  } else if (lat && lng) {
    endpoint += `&latlng=${encodeURIComponent(`${lat},${lng}`)}`;
  } else {
    return new NextResponse("Use ?address=... OU ?lat=...&lng=...", { status: 400 });
  }

  const res = await fetch(endpoint);
  const data = await res.json();

  if (data.status !== "OK" || !data.results?.length) {
    return new NextResponse(
      data.error_message || `Geocoding falhou: ${data.status}`,
      { status: 400 }
    );
  }

  const best = data.results[0];
  const loc = best.geometry.location;

  return NextResponse.json({
    formatted_address: best.formatted_address,
    location: { lat: loc.lat, lng: loc.lng },
    place_id: best.place_id,
  });
}
