gendiff:
	bin/gendiff.js
	
run:
	bin/nodejs-package.js 10

install:
	npm ci --legacy-peer-deps

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

lint:
	npx eslint .

publish:
	npm publish

.PHONY: test