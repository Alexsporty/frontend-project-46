install: 
	npm ci

publish:
	npm publish --dry-run

help:
	node bin\gendiff.js -h

runStylish:
	gendiff --format stylish file1.json file2.json 

runPlain:
	gendiff --format plain file1.json file2.json 

runJson:
	gendiff --format json file1.json file2.json

lint:
	npx eslint

lint-fix:
	npx eslint --fix .

tests:
	npm test --watchAll
	npx jest --coverage

test-coverage:
	npm test --coverage --coverageProvider=v8