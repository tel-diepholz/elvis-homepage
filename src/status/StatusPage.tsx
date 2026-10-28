import { useEffect, useState } from 'react';
import { CircleAlert, CircleCheck, CircleX, RefreshCw } from 'lucide-react';
import { Footer } from '../sections/Footer';
import { Header } from '../sections/Header';
import { STATUS_API } from '../links';
import { fetchStatus, LEVEL_LABEL, type RelayStatus, type StatusLevel } from './types';

const REFRESH_MS = 60_000;
const ICON = { ok: CircleCheck, degraded: CircleAlert, outage: CircleX } as const;
const OVERALL: Record<StatusLevel, string> = {
  ok: 'Alle Dienste laufen',
  degraded: 'Eingeschränkter Betrieb',
  outage: 'Störung',
};

const fmt = (iso: string) => new Date(iso).toLocaleString('de-DE', { dateStyle: 'medium', timeStyle: 'short' });
const pct = (v: number) => `${(Math.floor(v * 1000) / 10).toLocaleString('de-DE')} %`;

function Level({ level }: { level: StatusLevel }) {
  const Icon = ICON[level];
  return (
    <span className={`level level-${level}`}>
      <Icon size={16} aria-hidden />
      {LEVEL_LABEL[level]}
    </span>
  );
}

/** Statusseite: Mail-Dienst und Cloud-Relay (Daten von GET /v1/status des Relays, jede Minute neu) */
export function StatusPage() {
  const [status, setStatus] = useState<RelayStatus | null | undefined>(undefined);
  const [loadedAt, setLoadedAt] = useState<Date | null>(null);

  useEffect(() => {
    const load = () =>
      fetchStatus(STATUS_API).then((s) => {
        setStatus(s);
        setLoadedAt(new Date());
      });
    void load();
    const t = setInterval(load, REFRESH_MS);
    return () => clearInterval(t);
  }, []);

  const open = status?.incidents.filter((i) => !i.resolvedAt) ?? [];
  const past = status?.incidents.filter((i) => i.resolvedAt) ?? [];

  return (
    <>
      <Header />
      <main className="section status-page">
        <div className="wrap">
          <h2>Status</h2>
          <p className="section-lead">
            Zustand des Mail-Dienstes und des Cloud-Relays für App-Ortung und Personalbögen. ELVIS im Fahrzeug arbeitet
            auch ohne Relay weiter; betroffen sind nur diese Clouddienste.
          </p>

          {status === undefined ? (
            <p className="muted">Lade …</p>
          ) : status === null ? (
            <div className="status-hero status-hero-outage">
              <CircleX size={28} aria-hidden />
              <div>
                <strong>Relay nicht erreichbar</strong>
                <p>E-Mail und App-Ortung sind vermutlich gestört. Die Seite versucht es jede Minute erneut.</p>
              </div>
            </div>
          ) : (
            <>
              <div className={`status-hero status-hero-${status.overall}`}>
                {(() => {
                  const Icon = ICON[status.overall];
                  return <Icon size={28} aria-hidden />;
                })()}
                <div>
                  <strong>{OVERALL[status.overall]}</strong>
                  <p>{status.checkedAt ? `Letzte Prüfung ${fmt(status.checkedAt)}` : 'Noch keine Prüfung'}</p>
                </div>
              </div>

              {open.map((i) => (
                <article key={i.id} className={`incident incident-${i.severity}`}>
                  <h3>{i.title}</h3>
                  {i.body && <p>{i.body}</p>}
                  <p className="muted">Seit {fmt(i.startedAt)}</p>
                </article>
              ))}

              <ul className="components">
                {status.components.map((c) => {
                  const days = status.uptime[c.id] ?? [];
                  const measured = days.filter((d) => d.ok !== null);
                  const avg = measured.length ? measured.reduce((n, d) => n + (d.ok ?? 0), 0) / measured.length : null;
                  return (
                    <li key={c.id} className="component">
                      <div className="component-head">
                        <strong>{c.label}</strong>
                        <Level level={c.status} />
                      </div>
                      {c.detail && c.status !== 'ok' && <p className="muted component-detail">{c.detail}</p>}
                      <div className="uptime" role="img" aria-label={`${c.label}: Verfügbarkeit der letzten 90 Tage${avg !== null ? ` ${pct(avg)}` : ''}`}>
                        {days.map((d) => (
                          <span
                            key={d.day}
                            className={`bar ${d.ok === null ? 'bar-none' : d.ok >= 0.995 ? 'bar-ok' : d.ok >= 0.9 ? 'bar-degraded' : 'bar-outage'}`}
                            title={`${new Date(d.day).toLocaleDateString('de-DE')}: ${d.ok === null ? 'keine Daten' : pct(d.ok)}`}
                          />
                        ))}
                      </div>
                      <div className="uptime-legend muted">
                        <span>vor 90 Tagen</span>
                        <span>{avg !== null ? `${pct(avg)} verfügbar` : 'noch keine Daten'}</span>
                        <span>heute</span>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <h3 className="past-title">Vergangene Meldungen (14 Tage)</h3>
              {past.length === 0 ? (
                <p className="muted">Keine.</p>
              ) : (
                past.map((i) => (
                  <article key={i.id} className="incident incident-resolved">
                    <h3>{i.title}</h3>
                    {i.body && <p>{i.body}</p>}
                    <p className="muted">
                      {fmt(i.startedAt)} – {fmt(i.resolvedAt!)}
                    </p>
                  </article>
                ))
              )}
            </>
          )}
          {loadedAt && (
            <p className="muted status-refresh">
              <RefreshCw size={14} aria-hidden /> Aktualisiert {loadedAt.toLocaleTimeString('de-DE')}, automatisch jede Minute
            </p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
