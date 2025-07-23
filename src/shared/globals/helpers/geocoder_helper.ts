// geocoder.helper.ts
import NodeGeocoder from 'node-geocoder';

export class GeocoderHelper {
  static geocoder = NodeGeocoder({
    provider: process.env.GEOCODER_PROVIDER!,
    httpAdapter: 'https',
    apiKey: process.env.GEOCODER_API_KEY!,
    formatter: null,
  });
}
