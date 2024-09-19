import { envs } from "../../config/envs.plugin";

export function generateCaseEmailTemplate(genre: string, age: string, lat: number, lng: number): string {
    const mapboxUrl = generateMapboxStaticImageURL(lat, lng);
    const imageURL = "https://unamglobal.unam.mx/wp-content/uploads/2022/08/220801-aca1-des-f1-viruela-mono.jpg";
    return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Detalles del caso de Viruela del mono</title>
        <style>
            body {
                font-family: 'Georgia', serif;
                background-color: #ffffff;
                color: #333;
                margin: 0;
                padding: 0;
            }
            .container {
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                background-color: #f9f9f9;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            .header {
                background-color: #204f39;
                color: #ffffff;
                padding: 20px;
                text-align: center;
            }
            .subheader {
                text-align: center;
                padding: 10px 0;
                font-size: 16px;
                color: #444;
                background-color: #eae7dc;
            }
            .content {
                padding: 20px;
                text-align: center;
            }
            .content p {
                margin: 12px 0;
                font-size: 16px;
                color: #333;
            }
            .map-section {
                padding: 20px 0;
            }
            .map-img {
                width: 100%;
                height: auto;
                border-radius: 8px;
                margin-bottom: 20px;
            }
            .circular-image {
                width: 150px;
                height: 150px;
                border-radius: 50%;
                overflow: hidden;
                margin: 15px auto;
                display: block;
            }
            .circular-image img {
                width: 100%;
                height: 100%;
                object-fit: cover; /* Asegura que la imagen se ajuste bien dentro del contenedor circular */
                border-radius: 50%;
            }
            .footer {
                background-color: #f4f4f4;
                color: #666;
                padding: 10px;
                text-align: center;
                font-size: 12px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Caso de viruela del mono</h1>
            </div>
            <div class="circular-image">
                <img src="${imageURL}" alt="Viruela del mono">
            </div>
            <div class="subheader">
                <p>Reporte reciente</p>
            </div>
            <div class="content">
                <div class="map-section">
                    <img src="${mapboxUrl}" alt="Ubicación del caso" class="map-img"/>
                </div>
                <p><strong>Género:</strong> ${genre}</p>
                <p><strong>Edad:</strong> ${age} años</p>
                <p><strong>Latitud:</strong> ${lat}</p>
                <p><strong>Longitud:</strong> ${lng}</p>
            </div>
            <div class="footer">
                <p>Este es un correo generado automáticamente. Por favor, no responda a este mensaje.</p>
            </div>
        </div>
    </body>
    </html>
    `;
}

export const generateMapboxStaticImageURL = (lat: number, lng: number) => {
    const accessToken = envs.MAPBOX_ACCESS_TOKEN; 
    const zoom = 13; 
    const width = 600; 
    const height = 400;

    return `https://api.mapbox.com/styles/v1/mapbox/light-v11/static/pin-l-embassy+f74e4e(${lng},${lat})/${lng},${lat},${zoom}/${width}x${height}?access_token=${accessToken}`;
};
