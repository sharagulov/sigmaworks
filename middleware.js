import { NextResponse } from 'next/server';

export { default } from "next-auth/middleware"
export const config = {matcher:['/profile', '/protected/:path*', '/api/:path*']}
export function middleware(request) {
  const response = NextResponse.next();

  // Настройте разрешенные источники
  const allowedOrigins = ['https://safethrow-server.ru'];
  const origin = request.headers.get('origin');

  if (origin && allowedOrigins.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', "*");
  }

  // Настройте другие заголовки CORS
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  response.headers.set('Access-Control-Allow-Credentials', 'true');

  // Обработка предварительных запросов OPTIONS
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, { status: 200 });
  }

  return response;
}