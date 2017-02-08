---
layout: post
title: Day 10 eloquentjavascript
excerpt: ""
categories: [eloquentjavascript]
comments: true
tags: JavaScript
image:
  feature: https://images.unsplash.com/photo-1415329343600-a53dd8daf392?dpr=2&auto=compress,format&fit=crop&w=767&h=511&q=80&cs=tinysrgb&crop=
  credit: Jacob Wixom
  creditlink: https://unsplash.com/photos/aqW-xq6ft90
---

还是继续 `eloquentjavascript` 书本的学习

---

前言

[10_modules](http://eloquentjavascript.net/10_modules.html) 第十章，关于模块的这个章节，粗略的看了两遍，练习也没怎么做。其中一个练习是把之前的一个小项目修改成模块化的结构，打算后面再来修改

[11_language](http://eloquentjavascript.net/11_language.html) 是一个新的小项目，自己来写一个编程语言，制定语法什么的，也是后面回来学习吧

今天开始进入这本书的第二部分的第一章节 [12_browser](http://eloquentjavascript.net/12_browser.html) 。主要和我们讲解了浏览器中的 `JavaScript`

---

[12_browser](http://eloquentjavascript.net/12_browser.html)

总体讲解了下浏览器下的 `Javascript`，没有太多需要记录的

主要摘录下对于 `TCP` 和 `HTTP` 的解释

```
TCP

Most protocols are built on top of other protocols. Our example chat protocol treats the network as a streamlike device into which you can put bits and have them arrive at the correct destination in the correct order. Ensuring those things is already a rather difficult technical problem.

The Transmission Control Protocol (TCP) is a protocol that solves this problem. All Internet-connected devices “speak” it, and most communication on the Internet is built on top of it.

A TCP connection works as follows: one computer must be waiting, or listening, for other computers to start talking to it. To be able to listen for different kinds of communication at the same time on a single machine, each listener has a number (called a port) associated with it. Most protocols specify which port should be used by default. For example, when we want to send an email using the SMTP protocol, the machine through which we send it is expected to be listening on port 25.

Another computer can then establish a connection by connecting to the target machine using the correct port number. If the target machine can be reached and is listening on that port, the connection is successfully created. The listening computer is called the server, and the connecting computer is called the client.

Such a connection acts as a two-way pipe through which bits can flow—the machines on both ends can put data into it. Once the bits are successfully transmitted, they can be read out again by the machine on the other side. This is a convenient model. You could say that TCP provides an abstraction of the network.
```

---

```
HTTP

To add content to the Web, all you need to do is connect a machine to the Internet, and have it listen on port 80, using the Hypertext Transfer Protocol (HTTP). This protocol allows other computers to request documents over the network.

Each document on the Web is named by a Uniform Resource Locator (URL), which looks something like this:

  http://eloquentjavascript.net/12_browser.html
 |      |                      |               |
 protocol       server               path
The first part tells us that this URL uses the HTTP protocol (as opposed to, for example, encrypted HTTP, which would be https://). Then comes the part that identifies which server we are requesting the document from. Last is a path string that identifies the specific document (or resource) we are interested in.

Each machine connected to the Internet gets a unique IP address, which looks something like 37.187.37.82. You can use these directly as the server part of a URL. But lists of more or less random numbers are hard to remember and awkward to type, so you can instead register a domain name to point toward a specific machine or set of machines. I registered eloquentjavascript.net to point at the IP address of a machine I control and can thus use that domain name to serve web pages.

If you type the previous URL into your browser’s address bar, it will try to retrieve and display the document at that URL. First, your browser has to find out what address eloquentjavascript.net refers to. Then, using the HTTP protocol, it makes a connection to the server at that address and asks for the resource /12_browser.html.
```

### [13_dom](http://eloquentjavascript.net/13_dom.html)
