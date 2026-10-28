import { useEffect, useState } from 'react';
import { TriangleAlert } from 'lucide-react';
import { STATUS_API } from '../links';
import { fetchStatus, type RelayStatus } from '../status/types';

/** Hinweis oben auf der Startseite, nur wenn Mail oder Relay gestört sind */
export function StatusBanner() {
  const [state, setState] = useState<RelayStatus | null | undefined>(undefined);
  useEffect(() => {
    void fetchStatus(STATUS_API).then(setState);
  }, []);
  if (state === undefined || state?.overall === 'ok') return null;
  const outage = state === null || state.overall === 'outage';
  const open = state?.incidents.find((i) => !i.resolvedAt && i.severity !== 'info');
  return (
    <div className={`status-banner ${outage ? 'status-banner-outage' : ''}`} role="status">
      <div className="wrap status-banner-inner">
        <TriangleAlert size={18} aria-hidden />
        <span>
          {state === null
            ? 'Das Cloud-Relay ist nicht erreichbar – E-Mail und App-Ortung sind vermutlich gestört.'
            : open
              ? open.title
              : outage
                ? 'Ausfall beim Cloud-Relay – E-Mail oder App-Ortung funktionieren derzeit nicht.'
                : 'Eingeschränkter Betrieb beim Cloud-Relay – E-Mail oder App-Ortung können verzögert sein.'}
        </span>
        <a href="/status">Status ansehen</a>
      </div>
    </div>
  );
}
