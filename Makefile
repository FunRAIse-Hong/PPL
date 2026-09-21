# Requires SUPABASE_SERVICE_KEY in env (Dashboard → Project Settings → API Keys → service_role)

.PHONY: help link serve hooks test

help:
	@echo "PPL 訓練記錄 — 指令說明"
	@echo ""
	@echo "  make link you@example.com [https://redirect...]"
	@echo "      產生一次性 magic link（不寄信），貼到裝置瀏覽器即登入。"
	@echo "      需先 export SUPABASE_SERVICE_KEY=...（Dashboard → Project Settings → API Keys → service_role）"
	@echo ""
	@echo "  make test"
	@echo "      跑 index.html 裡目標重量計算的檢查。"
	@echo ""
	@echo "  make serve"
	@echo "      本機預覽 http://localhost:8642"
	@echo ""
	@echo "  make hooks"
	@echo "      啟用 .githooks（commit 時自動蓋頁尾版本時間）；clone 後跑一次"

link:
	@./magic-link.sh $(filter-out link,$(MAKECMDGOALS))

# swallow the email/redirect words so make doesn't treat them as targets
%:
	@:

test:
	@node test.js

serve:
	python3 -m http.server 8642

hooks:
	git config core.hooksPath .githooks
