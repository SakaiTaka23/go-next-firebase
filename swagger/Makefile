build: ## dockerイメージ作成
	docker build -t redoc-cli -f Dockerfile .

doc: ## ドキュメント作成
	docker run --rm -it  -v $(PWD):/data redoc-cli bundle reference/swagger.yaml

open: ## 生成されたドキュメントを開く
	open redoc-static.html

help: ## help
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)
