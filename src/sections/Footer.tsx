import { GITHUB, GITHUB_APP, GITHUB_HOMEPAGE, GITHUB_RELAY } from '../links';

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <div>
          <strong>ELVIS</strong>
          <span> · Open Source unter der MIT-Lizenz</span>
        </div>
        <nav aria-label="Projekte">
          <a href={GITHUB}>ELVIS</a>
          <a href={GITHUB_APP}>App</a>
          <a href={GITHUB_RELAY}>Relay</a>
          <a href={GITHUB_HOMEPAGE}>Diese Seite</a>
        </nav>
      </div>
    </footer>
  );
}
