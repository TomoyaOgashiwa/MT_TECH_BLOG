# Git関係の規約

## 開発手順

1. mainから```git checkout -b feature/issue-番号```で新規ブランチを作成
   1. 例：git checkout -b feature/issue-12
2. `git commit`前にprettierでフォーマットを整えること
3. `git commit`する際は以下項目を遵守すること
   1. 先頭にはprefixの絵文字またはどんなことに対するものなのかを記載する
      1. 例：style: ボタンの色を赤から青色に変更
   2. 句読点はつけない
   3. 大まかな規約は[こちら](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#type)を参照すること
4. Issueのタスクが終了したらpushする
5. `main`ブランチにPRをする。その際に小柏宛にレビュワーを設定する。
   1. この時、特別な事情がない限りは勝手にmainにマージしないこと
6. レビューが完了しタスクが完了した場合はProjectのステータスをDoneに移し、Issue自体もCloseさせること
