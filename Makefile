# Requires SUPABASE_SERVICE_KEY in env (Dashboard → Project Settings → API Keys → service_role)

.PHONY: help link serve

help:
	@echo "PPL 訓練記錄 — 指令說明"
	@echo ""
	@echo "  make link EMAIL=you@example.com [REDIRECT=https://...]"
	@echo "      產生一次性 magic link（不寄信），貼到裝置瀏覽器即登入。"
	@echo "      需先 export SUPABASE_SERVICE_KEY=...（Dashboard → Project Settings → API Keys → service_role）"
	@echo ""
	@echo "  make serve"
	@echo "      本機預覽 http://localhost:8642"

link:
	@./magic-link.sh "$(EMAIL)" $(REDIRECT)

serve:
	python3 -m http.server 8642
