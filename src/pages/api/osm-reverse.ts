import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { lat, lon } = req.query;
  if (!lat || !lon) {
    res.status(400).json({ error: 'lat and lon are required' });
    return;
  }

  const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&polygon=1&addressdetails=1`;

  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': 'carclaims-app/1.0' }
    });
    if (!response.ok) {
      res.status(response.status).json({ error: 'Failed to fetch OSM' });
      return;
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching from OSM:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
