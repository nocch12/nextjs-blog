---
title: 'react-markdown x ChakraUI でマークダウンをスタイリングする'
date: '2022-03-10'
tags: ['react', 'chakra-ui']
discription: 'Next.jsでマークダウンブログを作成する記事は調べればいくつも出てきますが、  
HTMLにparseされたマークダウンのスタイリングに関しては、あまり出てきませんでした。

ライブラリ側としては、基本的に自分らでスタイリングしてくれというスタンスなので仕方ないですが、
個人的にはCSSをなるべく書きたくなかったため、ChakraUIのコンポーネントを使用するようにしました。
'
---

# 概要
Next.jsでマークダウンブログを作成する記事は調べればいくつも出てきますが、  
HTMLにparseされたマークダウンのスタイリングに関しては、あまり出てきませんでした。  

ライブラリ側としては、基本的に自分らでスタイリングしてくれというスタンスっぽいので、単純に各々スタイル当てろということでしょう。  
ですが、個人的にはCSSをなるべく書きたくなかったため、ChakraUIのコンポーネントを使用してスタイルできるようにしました。

# ReactMarkdown
reactでマークダウンを扱う方法はいくつかありましたが、reactのコンポーネントを簡単に利用できそうな [react-markdown](https://github.com/remarkjs/react-markdown) を利用しました。  
早速実装を見ていきます。

# 実装
## react-markdownのラッパーコンポーネント

```ts
import {
  OrderedList,
  Text,
  Link,
  UnorderedList,
} from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';
import Blockquote from './Blockquote';
import CodeBlock from './CodeBlock';
import { H2, H3, H4, H5, H6 } from './Headings';

// マークダウンをparseしてスタイリング
const Markdown = ({ markdown }: Props) => {
  return (
    // コンポーネントを使いたいタグをcomponentsで指定
    <ReactMarkdown
      children={markdown}
      components={{
        h1: H2,
        h2: H3,
        h3: H4,
        h4: H5,
        h5: H6,
        p: (props) => <Text my={4} {...props} />,
        a: Link,
        ul: ({ ordered, ...props }) => <UnorderedList {...props} />,
        ol: ({ ordered, ...props }) => <OrderedList {...props} />,
        code: CodeBlock,
        blockquote: Blockquote,
      }}
    />
  );
};

export default Markdown;

```  
**H1**や**Blockquote**などは、ChakraUIを組み合わせてゴニョゴニョしたいため、コンポーネントとして切り出します。  
**p**はマージンだけ当てて後はChakraUIに任せるため、そのまま渡しています。  
**ul**,**ol**も**p**と同じですが、ReactMarkdownのpropsで'ordered'が渡さるため型が合わなくなります。そのため、除外してからChakraUIのコンポーネントに渡します。


## Blockquoteコンポーネント
自作コンポーネントはこんな感じです。

```ts
import { PropsWithChildren } from 'react';
import { Box, BoxProps } from '@chakra-ui/react';

// 引用符
const Blockquote = (props: PropsWithChildren<BoxProps>) => {
  return (
    <Box
      {...props}
      as="blockquote"
      pl={4}
      position="relative"
      _before={{
        content: `""`,
        position: 'absolute',
        height: '100%',
        ml: -4,
        borderLeftStyle: 'solid',
        borderLeftWidth: 4,
      }}
    />
  );
};

export default Blockquote;
```  
propsを受け取りつつ、ChakraUIのコンポーネントに好きなスタイルを当てています。  
**H\***や**CodeBlock**も似たような感じで好きに整形しています。

# 例

```md
# 例
### 上記の結果
こんな表示になります。

- list
  - list1
  - list2
    - list2.1
    - list2.2

>引用
>>二重引用も可能
```  

### 上記の結果
こんな表示になります。

- list
  - list1
  - list2
    - list2.1
    - list2.2

>引用
>>二重引用も可能


# 終わりに
Markdownのスタイリングに悩みましたが、  
- CSS得意ではないので、生で書きたくない
- 良さげなCSSテンプレートのようなものがパッと見つからなかった
- そもそもUIライブラリ(ChakraUI)を導入しているので、なるべくそちらに寄せたい
- スタイリングだけでなく、後々コンポーネントの出し分け等も行いたい  

という点でこの形を取りました。  
型の調整は若干必要ですが、かなり直感的に使えて満足。react-markdown 様様です。  