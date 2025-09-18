import { Loader } from "@googlemaps/js-api-loader";

let loader: Loader | null = null;

export function getMapsLoader() {
  if (!loader) {
    const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;
    loader = new Loader({
      apiKey: key,
      version: "weekly",
      libraries: [] // adicione "places" se quiser Autocomplete depois
    });
  }
  return loader;
}
