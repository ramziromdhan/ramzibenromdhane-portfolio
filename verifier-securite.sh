#!/usr/bin/env bash
# Vérifie l'état de sécurité de ramzibenromdhane.me (en-têtes, redirections, DNS, email).
# Usage : bash verifier-securite.sh [domaine]   (nécessite curl et dig)
D="${1:-ramzibenromdhane.me}"

echo "== En-têtes HTTP de https://$D"
curl -sI "https://$D" | grep -iE '^(HTTP|strict-transport-security|content-security-policy|x-content-type-options|x-frame-options|referrer-policy|permissions-policy|cross-origin-opener-policy)' \
  || echo "ECHEC : aucune réponse"

echo; echo "== www doit rediriger vers le domaine sans www (attendu : 301 et location)"
curl -sI "https://www.$D" | grep -iE '^(HTTP|location)'

echo; echo "== security.txt (attendu : 200)"
curl -s -o /dev/null -w '%{http_code}\n' "https://$D/.well-known/security.txt"

echo; echo "== Script d'analyse injecté par l'hébergeur (attendu : aucune ligne si désactivé)"
curl -s "https://$D" | grep -io 'cloudflareinsights[^"]*' | head -2

echo; echo "== DNSSEC : enregistrement DS chez le registre (attendu : une ligne)"
dig +short DS "$D"

echo; echo "== SPF (attendu : une seule ligne v=spf1)"
dig +short TXT "$D" | grep -i 'v=spf1'

echo; echo "== DMARC (attendu : v=DMARC1; p=...)"
dig +short TXT "_dmarc.$D"

echo; echo "== MX (redirection d'email)"
dig +short MX "$D"
