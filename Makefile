.PHONY: serve format lint

serve:
	deno run --allow-net --allow-read serve.ts

format:
	deno fmt web/

lint:
	deno lint web/js/
