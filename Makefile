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
	@docker-compose -f docker-compose.qa.yml run allure ./allure generate /allure-results -o /allure-report --clean

serve:
	@docker-compose -f docker-compose.qa.yml run --service-ports allure ./allure serve -p 80 /allure-results
