type ServerFetchSuccess<T> = { isSuccess: true; status: number; data: T };
type ServerFetchFailure = {
  isSuccess: false;
  status: number;
  error: string;
  data: undefined;
};
type ServerFetchResult<T> = ServerFetchSuccess<T> | ServerFetchFailure;

type NextCacheOpt = { revalidate?: number; tags?: string[] } | undefined;

interface ServerFetchOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
  next?: NextCacheOpt;
}

// 환경 변수에서 API 서버 URL을 가져옵니다
const BASE = process.env.NEXT_PUBLIC_API_SERVER_URL;
if (!BASE) {
  throw new Error("NEXT_PUBLIC_API_SERVER_URL is not defined");
}
async function serverFetch<T = unknown>(
  url: string,
  { body, next, headers, ...init }: ServerFetchOptions = {}
): Promise<ServerFetchResult<T>> {
  const reqHeaders = new Headers(headers);
  let requestBody: RequestInit["body"] = undefined;

  // Body가 객체 형태일 경우 JSON으로 변환
  if (body) {
    if (
      typeof body === "object" &&
      !(body instanceof Blob) &&
      !(body instanceof FormData)
    ) {
      reqHeaders.set("Content-Type", "application/json");
      requestBody = JSON.stringify(body);
    } else {
      requestBody = body as BodyInit;
    }
  }

  try {
    const response = await fetch(`${BASE}${url}`, {
      ...init,
      headers: reqHeaders,
      body: requestBody,
      next,
    });

    // HTTP 에러 응답 처리 (throw 대신 return)
    if (!response.ok) {
      const errorBody = await response.text();
      return {
        isSuccess: false,
        status: response.status,
        error: errorBody,
        data: undefined,
      };
    }

    // 성공 응답 처리
    const contentType = response.headers.get("content-type") ?? "";
    const data = contentType.includes("application/json")
      ? await response.json()
      : await response.text();

    return {
      isSuccess: true,
      status: response.status,
      data: data as T,
    };
  } catch (e: unknown) {
    // 네트워크 에러 등 fetch 자체가 실패한 경우
    const error =
      e instanceof Error ? e.message : "An unknown fetch error occurred";
    return {
      isSuccess: false,
      status: 500, // 네트워크 에러는 500번대 상태로 간주
      error,
      data: undefined,
    };
  }
}

export default serverFetch;
