# Welcome to Remix!

- 📖 [Remix docs](https://remix.run/docs)

##

1. XATA をグローバルにインストールして API キーを取得する

```sh
npm install -g @xata.io/cli

cd ./src/app

npm run xata:login

npm run xata:init

curl http://localhost:42967/new -i
```

```sh
curl http://localhost:${生成されたぽーと}/new -i
```

指定の URL にアクセスしてキーを取得
その後更新されるので curl でアクセス

```sh
curl
```

コマンドが完了したら api キーが作られているか確認

```sh
cat ~/.config/xata/credentials
```

## Development

Run the dev server:

```shellscript
npm run dev
```

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever css framework you prefer. See the [Vite docs on css](https://vitejs.dev/guide/features.html#css) for more information.
