# gulp

## 起動

```
yarn
yarn gulp build
yarn gulp
```

## node_modulesのファイルを使う場合

gulp-npm-filesを使って`dist/node_modules/..`にファイルを置けるようにしているので
以下のように読み込める

```
<link rel="stylesheet" href="node_modules/swiper/dist/css/swiper.min.css">
```
