# コード規約

## 命名規則

命名が長くなっても直感的に理解できるならばOK。むしろ短くして直感的に理解できないものは却下。

- ファイル名：ケバブケース

  例：sample-component.tsx

- UIコンポーネント名：パスカルケース

```ts
const SampleComponent = () => {return <div>SampleComponent</div>}
```

- 変数名・関数名：キャメルケース
  例：sampleFunction

## ComponentへのPropsや関数の引数での値の受け渡し方

- 単体の受け渡しやデータをそのまま扱う場合の受け渡しは位置引数で対応

```ts
const sampleFunction = (hoge: string) => {
  // 処理
};
```

- 複数代入の場合は分割して対応

```ts
type Props = {
  hoge: string
  fuga: number
}

// コンポーネントの場合
const sampleFunction: React.FC<Props> = ({hoge, fuga}) => {
  // 処理
}

// 関数の場合
const sampleFunction = ({hoge, fuga}: Props) => {
  // 処理
}

```

### 注意点

引数受け渡しは基本上記の通りだが、ライブラリの引数やNext由来の値がPropsで渡される場合は既に決まった渡し方があるため、その場合はその通りに従う。

## export

- ページやUIコンポーネントファイル：default export

```ts
const SampleComponent = () => {
  // 処理
};

export default SampleComponent;
```

- typeや関数ファイル：named export

```ts
export type Sample = {
  // 型定義
};

export const sampleFunction = () => {
  // 処理
};
```

ページやUIコンポーネントを**default export**にする理由は単一なものとし保守性を高くするため。
関数やtypeは小さい粒度から大きいのものまで多々作成されることから、分類毎にファイルを作成して取りまとめると可読性が上がることを期待できるため。

ただし、ページのMetadataを変更したい場合は以下の通りexportを使用しないと反映されないことからPage.tsxのMetadata用の設定は例外とする。

```ts
export const metadata: Metadata = {
  title: "metadata",
};
```

## CSSについて

このプロジェクトでは**tailwind css**を採用しているのでCSS Modulesやstyled-componentなど他の方法でスタイリングをしないこと。

## 定数の使用

基本的に**const**のみを使用すること。

varはもちろん、letも基本使用しないこと。

使用する場合は関数の中でswitch文やif文でどうしてもletでないと対応ができない場合のみ。その場合でもまずは他のオプションがないか考えること。

理由はvarやletだと再代入が可能になり予期せぬバグが発生する恐れがあり、コードの保守性が悪くなるため。

## 条件分岐について

if文で早期returnできる場合は必ず可能なものを最初の段階でまとめてreturnさせること。

switch文はなるべく使用しないこと。switch文の代替としてオブジェクト配列にした定数を作成して処理させるなどの工夫をすること。

理由はswitch文の分岐が大きくなってきた場合、可読性及び保守するのが段々と困難になるため。

## ループ処理について

基本は以下を使用すること

※ここでの記載は飽くまでmap, for, forEachのみの言及なのでfilterやfindなどは通常通り使用してOK

- array.map: 配列の中身をループさせて処理し、**新たな配列を作成**すること
- for(const single of array): 反復可能オブジェクトから取り出した値を1つずつ順次処理すること
  - continueやbreakでループを抜け出すことも可能

### forEachを使用しない理由

forEachはfor ofと処理の仕方は似ていますが、continueやbreakでループ処理を抜け出すことができない。また、forEachは**同期的**に処理を行うため非同期処理の対応ができないので仮に非同期処理を記載したとしてもそれはforEach自体が非同期なったこととイコールではありません。
