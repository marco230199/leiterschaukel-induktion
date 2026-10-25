#!/usr/bin/env bash
# ------------------------------------------------------------------
# Richtet den Abgabe-Server auf einem frischen Ubuntu-24.04-Server ein (z. B. Hetzner Cloud), als root ausführen:
#
#   bash einrichten.sh                      # Adresse automatisch: <IP-mit-Strichen>.sslip.io
#   bash einrichten.sh abgabe.meine-domain.de
#
# Installiert Node.js, Caddy (HTTPS mit automatischem Zertifikat) und git, holt das Repo nach /opt/leiterschaukel,
# legt die PIN in /etc/leiterschaukel-abgabe.env an und startet alles als Dienst. Erneut ausführen = aktualisieren.
# ------------------------------------------------------------------
set -euo pipefail

REPO=https://github.com/marco230199/leiterschaukel-induktion.git
ZIEL=/opt/leiterschaukel
ENV=/etc/leiterschaukel-abgabe.env
HERKUNFT=https://marco230199.github.io

if [[ $EUID -ne 0 ]]; then echo "Bitte als root ausführen."; exit 1; fi

IP=$(hostname -I | awk '{print $1}')
DOMAIN=${1:-${IP//./-}.sslip.io}

echo "==> Pakete installieren"
apt-get update -q
DEBIAN_FRONTEND=noninteractive apt-get install -y -q nodejs caddy git ufw unattended-upgrades

echo "==> Code holen bzw. aktualisieren ($ZIEL)"
if [[ -d $ZIEL/.git ]]; then git -C "$ZIEL" pull --ff-only; else git clone --depth 1 "$REPO" "$ZIEL"; fi

echo "==> Einstellungen ($ENV)"
if [[ ! -f $ENV ]]; then
  PIN=$(shuf -i 100000-999999 -n 1)
  cat > "$ENV" <<EOF
# Einstellungen des Abgabe-Servers (nach Änderungen: systemctl restart leiterschaukel-abgabe)
PIN=$PIN
HOST=127.0.0.1
PORT=8080
ERLAUBTE_HERKUNFT=$HERKUNFT
EOF
  chmod 600 "$ENV"
fi

echo "==> Dienst einrichten"
cp "$ZIEL/server/deploy/leiterschaukel-abgabe.service" /etc/systemd/system/
systemctl daemon-reload
systemctl enable leiterschaukel-abgabe
systemctl restart leiterschaukel-abgabe

echo "==> Caddy (HTTPS) für $DOMAIN"
sed "s/DOMAIN/$DOMAIN/" "$ZIEL/server/deploy/Caddyfile" > /etc/caddy/Caddyfile
systemctl reload caddy || systemctl restart caddy

echo "==> Firewall: nur SSH, HTTP, HTTPS"
ufw allow OpenSSH >/dev/null
ufw allow 80/tcp >/dev/null
ufw allow 443/tcp >/dev/null
ufw --force enable >/dev/null

sleep 3
echo
echo "Fertig."
echo "  Server-Adresse:  https://$DOMAIN"
echo "  Test:            https://$DOMAIN/api/status"
echo "  PIN:             $(grep '^PIN=' "$ENV" | cut -d= -f2)   (ändern: nano $ENV, dann systemctl restart leiterschaukel-abgabe)"
echo
echo "In js/config.js eintragen:  export const ABGABE_SERVER = 'https://$DOMAIN';"
