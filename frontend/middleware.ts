// middleware.ts (na raiz da pasta frontend)
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Esta função DEVE ser exportada como default ou nomeada como middleware
export function middleware(request: NextRequest) {
  // Por enquanto, apenas permitir que todas as requisições passem
  return NextResponse.next()
}

// Configuração opcional - especifica em quais rotas o middleware deve rodar
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
