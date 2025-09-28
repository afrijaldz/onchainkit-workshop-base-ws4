import { cookies } from "next/headers";

async function proxyRequest(
  request: Request,
  { params }: { params: Promise<{ path: string | string[] }> }
) {
  const API_ENDPOINT = process.env.API_ENDPOINT;
  const { path } = await params;

  const cookieStore = await cookies();
  const token = cookieStore.get("jwt")?.value || "";

  const targetPath = Array.isArray(path) ? path.join("/") : path;

  const url = new URL(request.url);
  const queryString = url.search || "";

  const targetUrl = `${API_ENDPOINT}/api/${targetPath}${queryString}`;

  const requestHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => {
    requestHeaders[key] = value;

    if (token) {
      requestHeaders["Authorization"] = `Bearer ${token}`;
    }
  });

  let bodyContent: string | null = null;

  if (request.method !== "GET" && request.method !== "HEAD") {
    if (request.body) {
      bodyContent = await request.text();
    }
  }

  const fetchResponse = await fetch(targetUrl, {
    method: request.method,
    headers: requestHeaders,
    body: bodyContent,
  });

  const responseHeaders = new Headers();
  fetchResponse.headers.forEach((value, key) => {
    responseHeaders.set(key, value);
  });

  const responseData = await fetchResponse.json();

  if (targetPath === "auth/login" && fetchResponse.ok) {
    if (responseData.data.jwt) {
      cookieStore.set({
        name: "jwt",
        value: responseData.data.jwt,
      });
    }

    const removeJwtData = {
      ...responseData,
      data: { ...responseData.data, jwt: undefined },
    };

    return new Response(JSON.stringify(removeJwtData), {
      status: fetchResponse.status,
      statusText: fetchResponse.statusText,
    });
  }

  return new Response(fetchResponse.body, {
    status: fetchResponse.status,
    statusText: fetchResponse.statusText,
    headers: responseHeaders,
  });
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ path: string[] | string }> }
) {
  return proxyRequest(request, { params });
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ path: string[] | string }> }
) {
  return proxyRequest(request, { params });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ path: string[] | string }> }
) {
  return proxyRequest(request, { params });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ path: string[] | string }> }
) {
  return proxyRequest(request, { params });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ path: string[] | string }> }
) {
  return proxyRequest(request, { params });
}

export async function OPTIONS(
  request: Request,
  { params }: { params: Promise<{ path: string[] | string }> }
) {
  return proxyRequest(request, { params });
}

export async function HEAD(
  request: Request,
  { params }: { params: Promise<{ path: string[] | string }> }
) {
  return proxyRequest(request, { params });
}
