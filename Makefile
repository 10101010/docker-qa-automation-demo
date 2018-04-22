clean:
	rm -rf ./allure*

run-app:
	@docker-compose -f docker-compose.app.yml up -d

stop-app:
	@docker-compose -f docker-compose.app.yml down

run-selenium-grid:
	@docker-compose -f docker-compose.qa.yml up -d hub chrome

run-tests:
	@docker-compose -f docker-compose.qa.yml up tests
	
report:
	@docker run --rm -it -v ${PWD}/allure-results:/allure-results -v ${PWD}/allure-report:/allure-report  masterandrey/docker-allure ./allure generate /allure-results -o /allure-report --clean

serve:
	@docker run --rm -it -v ${PWD}/allure-results:/allure-results -v ${PWD}/allure-report:/allure-report -p 8800:80 masterandrey/docker-allure ./allure serve -p 80 /allure-results
