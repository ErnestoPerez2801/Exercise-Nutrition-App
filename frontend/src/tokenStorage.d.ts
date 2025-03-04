// tokenStorage.d.ts
export function storeToken(tok: { accessToken: string }): void;
export function retrieveToken(): string | null;