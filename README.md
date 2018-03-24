# 订阅阅读器测试项目

## 运行应用

git clone 或 download 整个项目，打开 index.html 即可使用订阅阅读器。值得说明的是订阅阅读器并不是整个项目的重点，我们更加关注 Jasmine 库对订阅阅读器的测试情况。

## 测试步骤

只需要打开 index.html 即可查看测试情况。而测试用例编写在 **./jasmine/spec/feedreader.js** ，这里包含了所有的测试功能点。

测试用例| 功能点
--|--
RSS Feeds | 保证 allFeeds 已被定义且不为空，allFedds 的名字和链接字段合法
The menu | 保证菜单元素默认隐藏，且点击图标时，菜单显示/隐藏
Initial Entries | 保证 loadFeed 函数被调用且工作正常，加载新源时内容也进行改变

## 项目说明

**订阅阅读器测试** 项目是我在 **Udacity 前端开发（进阶） 课程** 的练习项目。

### 知识点

1. JQuery。
2. Jasmine 库。
3. 测试的基础知识。

### 文件结构

1. app.js 订阅阅读器的整个交互逻辑文件。
2. feedereader.js 用于编写测试用例项目核心文件。