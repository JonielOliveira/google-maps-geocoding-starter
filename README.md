# Google Maps + Geocoding • Next.js Starter

Starter minimalista para testar e visualizar a integração com:
- **Maps JavaScript API** (chave pública no browser)
- **Geocoding API** (chave de servidor na rota de API)

## Requisitos
- Node 18+
- Projeto no Google Cloud com Billing habilitado
- APIs ativadas:
  - Maps JavaScript API
  - Geocoding API

## Variáveis de ambiente
Crie `.env.local` na raiz:
```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=YOUR_BROWSER_RESTRICTED_KEY
GOOGLE_GEOCODING_API_KEY=YOUR_SERVER_RESTRICTED_KEY
