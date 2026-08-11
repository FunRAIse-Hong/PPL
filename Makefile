# Usage: make link EMAIL=you@example.com [REDIRECT=https://...]
# Requires SUPABASE_SERVICE_KEY in env (Dashboard → Project Settings → API Keys → service_role)

.PHONY: link serve

link:
	@./magic-link.sh "$(EMAIL)" $(REDIRECT)

serve:
	python3 -m http.server 8642
