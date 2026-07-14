import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  return handleProxy(req);
}

export async function POST(req: NextRequest) {
  return handleProxy(req);
}

export async function PUT(req: NextRequest) {
  return handleProxy(req);
}

export async function DELETE(req: NextRequest) {
  return handleProxy(req);
}

export async function PATCH(req: NextRequest) {
  return handleProxy(req);
}

export async function OPTIONS(req: NextRequest) {
  return handleProxy(req);
}

async function handleProxy(req: NextRequest) {
  const url = new URL(req.url);
  const path = url.pathname.replace(/^\/api\//, '');
  
  // Construct destination URL using the backend base URL
  const apiBase = process.env.API_URL || 'https://api.retro-type.detqel.com';
  const destinationUrl = `${apiBase}/api/${path}${url.search}`;

  // Copy incoming headers, omitting the Host and Content-Length headers to avoid conflicts
  const headers = new Headers();
  req.headers.forEach((value, key) => {
    const lowerKey = key.toLowerCase();
    if (lowerKey !== 'host' && lowerKey !== 'content-length') {
      headers.set(key, value);
    }
  });

  // Extract body for mutative methods
  let body: any = null;
  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) {
    try {
      const text = await req.text();
      if (text) {
        body = text;
      }
    } catch (e) {
      // Failed or no body to parse
    }
  }

  try {
    const response = await fetch(destinationUrl, {
      method: req.method,
      headers,
      body,
      cache: 'no-store',
    });

    const responseText = await response.text();
    
    // Copy response headers, avoiding content-encoding and transfer-encoding issues
    const responseHeaders = new Headers();
    response.headers.forEach((value, key) => {
      const lowerKey = key.toLowerCase();
      if (lowerKey !== 'content-encoding' && lowerKey !== 'transfer-encoding') {
        responseHeaders.set(key, value);
      }
    });

    return new NextResponse(responseText, {
      status: response.status,
      headers: responseHeaders,
    });
  } catch (error: any) {
    console.error(`[Proxy Error] failed routing to ${destinationUrl}:`, error);
    return NextResponse.json(
      { error: 'Backend proxy error', details: error.message },
      { status: 502 }
    );
  }
}
