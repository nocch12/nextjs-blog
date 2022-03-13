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
(CodeBlockのシンタックスハイライトに関しては
[react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter)
を利用した例が多く出てきたためそちらを参考にしました)

ライブラリ側としては、基本的に自分らでスタイリングしてくれというスタンスなので仕方ないですが、  
個人的にはCSSをなるべく書きたくなかったため、ChakraUIのコンポーネントを使用するようにしました。

# ReactMarkdown
reactでマークダウンを扱う方法はいくつかありましたが、reactのコンポーネントを簡単に利用できそうな  
[react-markdown](https://github.com/remarkjs/react-markdown) を利用しました。