build:
	npm run build

test: build
	grep "DOCTYPE" public/index.html >/dev/null
