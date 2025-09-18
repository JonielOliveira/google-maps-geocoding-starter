export type GeocodingResult = {
  formatted_address: string;
  location: { lat: number; lng: number };
  place_id: string;
};
