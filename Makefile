include .env

COMPOSE = docker compose
UP = $(COMPOSE) up
RUN_BACK = $(COMPOSE) run back
RUN_FRONT = $(COMPOSE) run front

up:
	$(UP)
back:
	$(UP) back
front:
	$(UP) front
db:
	$(UP) db
build:
	$(COMPOSE) build

.env:
	cp .env.example .env
yarn_install:
	$(RUN_FRONT) yarn install
tidy:
	$(RUN_BACK) go mod tidy

mysql:
	docker-compose exec db bash -c 'mysql -u $(DB_USERNAME) -p$(DB_PASSWORD) $(DB_DATABASE)'
