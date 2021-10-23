include .env

COMPOSE = docker compose
UP = $(COMPOSE) up
RUN_BACK = $(COMPOSE) run back
RUN_FRONT = $(COMPOSE) run front

up: ## コンテナ全てを立ち上げ
	$(UP)
back: ## backendコンテナのみ立ち上げ
	$(UP) back
front: ## frontendコンテナのみ立ち上げ
	$(UP) front
db: ## DBコンテナのみ立ち上げ
	$(UP) db
build: ## コンテナbuild
	$(COMPOSE) build

.env: ## .envファイルコピー
	cp .env.example .env
yarn_install: ## yarn install
	$(RUN_FRONT) yarn install
tidy: ## go mod tidy
	$(RUN_BACK) go mod tidy

mysql: ## DBコンテナに入る
	docker-compose exec db bash -c 'mysql -u $(DB_USERNAME) -p$(DB_PASSWORD) $(DB_DATABASE)'

open: ## ドキュメントを開く
	open swagger/redoc-static.html

help: ## help
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)
