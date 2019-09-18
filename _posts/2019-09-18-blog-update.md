---
layout: post
title: 网站更新记录
excerpt: ""
categories: 
tags: blog
---

这个项目接近半年没更新过，之前试用了一下 hexo，感觉还是喜欢用 jekyll，所以回来更新这个项目了，主要更新了下面几个方面

* 网站浏览量的修改
* Jekyll本地更新
* 评论系统更新

# 网站浏览量的修改

[http://busuanzi.ibruce.info/](http://busuanzi.ibruce.info/) 的 `JavaScript` 地址又变更了，这里简单替换一下，不过感觉这个问题也很郁闷，从使用开始已经换过几次了，不过现在看他使用的是 Github Pages 的，应该比较稳定，之前使用的是七牛的静态服务器

# 评论系统更新

评论系统从原来的 Disqus 迁移到了 [valine - 一款快速、简洁且高效的无后端评论系统](https://valine.js.org/)

# Jekyll本地更新

太久没更新项目，重新安装了 [Jekyll - 简单静态博客网站生成器](http://jekyllcn.com/)

提示了 ruby 版本过低，于是下载了 ruby 的包管理工具 rvm

```bash
curl -L get.rvm.io | bash -s stable
```

安装成功之后安装最新的 ruby

```bash
rvm install "ruby-2.6.4"
```

之后就可以愉快的使用 jekyll 了

中间还遇到了代理问题，主要是在公司配置了，进入到 ~/.bash_profile 注释掉代理的就好了