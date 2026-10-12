import { Claimsdata } from '@/types/models';

const PHOTO_API_URL =
  process.env.NEXT_PUBLIC_PHOTO_API_URL || '/api/photo/extract';

export type PhotoExtractRequest = {
  currentState?: Record<string, unknown>;
  stepKey?: string;
};

type PhotoExtractResponse = {
  imageDescription?: string;
  claimsData?: Record<string, unknown>;
};

export type PhotoExtractResult = {
  claimsData: Partial<Claimsdata>;
  imageDescription?: string;
};

export class PhotoApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PhotoApiError';
  }
}

export async function submitPhoto(
  file: File,
  options: PhotoExtractRequest = {}
): Promise<PhotoExtractResult> {
  const resizedBlob = await resizeImage(file);

  const formData = new FormData();
  formData.append('image', resizedBlob, 'photo.jpg');

  if (options.currentState && Object.keys(options.currentState).length > 0) {
    formData.append('currentState', JSON.stringify(options.currentState));
  }

  if (options.stepKey) {
    formData.append('stepKey', options.stepKey);
  }

  const response = await fetch(PHOTO_API_URL, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    let message = `Photo API error (${response.status})`;
    try {
      const body = await response.json();
      if (body?.errors?.[0]?.detail) {
        message = body.errors[0].detail;
      } else if (body?.message) {
        message = body.message;
      } else if (typeof body?.error === 'string') {
        message = body.error;
      }
    } catch {
      // use default message
    }
    throw new PhotoApiError(message);
  }

  const json = (await response.json()) as PhotoExtractResponse;

  if (!json.claimsData || Object.keys(json.claimsData).length === 0) {
    throw new PhotoApiError('Keine relevanten Daten im Foto gefunden');
  }

  return {
    claimsData: json.claimsData as Partial<Claimsdata>,
    imageDescription: json.imageDescription,
  };
}

const MAX_DIMENSION = 2048;
const JPEG_QUALITY = 0.85;

function resizeImage(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      let { width, height } = img;
      if (width <= MAX_DIMENSION && height <= MAX_DIMENSION) {
        resolve(file);
        return;
      }
      const scale = MAX_DIMENSION / Math.max(width, height);
      width = Math.round(width * scale);
      height = Math.round(height * scale);

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(file);
        return;
      }
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            resolve(file);
          }
        },
        'image/jpeg',
        JPEG_QUALITY
      );
    };
    img.onerror = () => reject(new PhotoApiError('Bild konnte nicht geladen werden'));
    img.src = URL.createObjectURL(file);
  });
}
