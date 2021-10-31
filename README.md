# go-next-firebase



## 概要

Go(Fiber) + Next.js(TypeScript) + Firebaseで作成したテンプレート



## テンプレートの内容

- Backendテンプレート クリーンアーキテクチャに基づいた設計

- 認証機能 FirebaseAuthによる認証
- 作成したユーザーをバックエンドのDBに登録
- ドキュメントの作成環境 Swaggerを用いたドキュメントの作成 コマンドでドキュメントを生成



## バージョン情報

```
Go 1.16
Next.js 11.1.2
React 17.0.2
Firebase 9.1.3
MySQL 8.0
```



## セットアップ

1. 環境変数の設定

```
make .env
```

.envにあるFirebaseAuthの環境変数を設定

FirebaseAdminSDKをbackendの一番上のディレクトリに設置



2. Dockerコンテナをビルド

```
docker compose build
```



3. 必要な依存をインストール

```
make yarn_install
```



4. 立ち上げ

```
make up
```



## 注意事項

- このプロジェクトはDocker上で動かすことを前提としています。
- ローカルで動かす場合は.envファイルをfrontend、backendの両方に配置してください。
