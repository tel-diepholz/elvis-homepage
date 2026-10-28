/** Antwort von GET /v1/status des Relays – Gegenstück: elvis-relay src/mailprotocol.ts (RelayStatus) */
export type StatusLevel = 'ok' | 'degraded' | 'outage';

export interface StatusIncident {
  id: number;
  title: string;
  body: string;
  severity: 'info' | StatusLevel;
  components: string[];
  startedAt: string;
  resolvedAt: string | null;
}

export interface RelayStatus {
  overall: StatusLevel;
  checkedAt: string | null;
  components: { id: string; label: string; status: StatusLevel; lastCheck: string | null; detail: string }[];
  uptime: Record<string, { day: string; ok: number | null }[]>;
  incidents: StatusIncident[];
}

export const LEVEL_LABEL: Record<StatusLevel, string> = { ok: 'Betriebsbereit', degraded: 'Eingeschränkt', outage: 'Ausfall' };

/** null = Relay nicht erreichbar */
export async function fetchStatus(url: string): Promise<RelayStatus | null> {
  try {
    const res = await fetch(url, { cache: 'no-store' });
    return res.ok ? ((await res.json()) as RelayStatus) : null;
  } catch {
    return null;
  }
}
