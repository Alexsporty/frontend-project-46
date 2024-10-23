install: 
	npm ci

publish:
	npm publish --dry-run

help:
	node bin\gendiff.js -h

runStructured:
	gendiff '.\__fixtures__\file1.json' '.\__fixtures__\file2.json' --format stylish

runPlain:
	gendiff '.\__fixtures__\file1.json' '.\__fixtures__\file2.json' --format plain

runJson:
	gendiff '.\__fixtures__\file1.json' '.\__fixtures__\file2.json' --format json

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

lint:
	npx eslint .

publish:
	npm publish

.PHONY: test