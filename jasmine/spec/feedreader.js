/* feedreader.js
 *
 * 这是 Jasmine 会读取的spec文件，它包含所有的要在你应用上面运行的测试。
 */

/* 我们把所有的测试都放在了 $() 函数里面。因为有些测试需要 DOM 元素。
 * 我们得保证在 DOM 准备好之前他们不会被运行。
 */
$(function () {
    /* 这是我们第一个测试用例 - 其中包含了一定数量的测试。这个用例的测试
     * 都是关于 Rss 源的定义的，也就是应用中的 allFeeds 变量。
    */
    describe('RSS Feeds', function () {
        /* 这是我们的第一个测试 - 它用来保证 allFeeds 变量被定义了而且
         * 不是空的。在你开始做这个项目剩下的工作之前最好实验一下这个测试
         * 比如你把 app.js 里面的 allFeeds 变量变成一个空的数组然后刷新
         * 页面看看会发生什么。
        */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /*
         * 一个测试遍历 allFeeds 对象里面的所有的源来保证有链接字段而且链接不是空的。
         */
        it('Link to the right', function () {
            // ES6 遍历匹配
            allFeeds.forEach(word => {
                // 匹配不为 http:// 链接
                expect(word.url).toMatch(/^http:\/\//);
                // 匹配不为空
                expect(word.url).not.toBe('');
            });

        });


        /*
         * 一个测试遍历 allFeeds 对象里面的所有的源来保证有名字字段而且不是空的。
         */
        it('source valid', function () {
            // ES6 遍历匹配
            allFeeds.forEach(word => {
                // 源有名字字段
                expect(word.name).toBeDefined();
                // 源不为空
                expect(word.name).not.toBe('');
            });
        })
    });


    /* "The menu" 的测试用例 */
    describe('The menu', function () {
        /*
         * 写一个测试用例保证菜单元素默认是隐藏的。你需要分析 html 和 css
         * 来搞清楚我们是怎么实现隐藏/展示菜单元素的。
         */
        let $menuIcon = $('.menu-icon-link');
        let $body = $('body');

        it('default hidden', function () {
            expect($body.hasClass('menu-hidden')).toBe(true);
        })

        /* 
         * 写一个测试用例保证当菜单图标被点击的时候菜单会切换可见状态。这个
         * 测试应该包含两个 expectation ： 当点击图标的时候菜单是否显示，
         * 再次点击的时候是否隐藏。
         */

        it('switch menu status', function () {
            // 触发器，用于模拟点击效果，判断点击时菜单是否显示
            $menuIcon.trigger('click');
            expect($body.hasClass('menu-hidden')).toBe(false);
            // 再次使用触发器，判断再次点击的时候菜单是否隐藏的同时也将菜单恢复到了初识状态
            $menuIcon.trigger('click');
            expect($body.hasClass('menu-hidden')).toBe(true);
        });
    })


    /* "Initial Entries" 的测试用例 */
    describe('Initial Entries', function () {
        /*
         * 写一个测试保证 loadFeed 函数被调用而且工作正常，即在 .feed 容器元素
         * 里面至少有一个 .entry 的元素。
         *
         * 记住 loadFeed() 函数是异步的所以这个而是应该使用 Jasmine 的 beforeEach
         * 和异步的 done() 函数。
         */

        // 在describe函数中每个Spec执行之前执行
        beforeEach(function (done) {
            loadFeed(0, done);
        });

        it('loadFeed normal', function () {
            expect($('.feed .entry').length).toBeGreaterThanOrEqual(1);
        });

    });
    /* "New Feed Selection" 的测试用例 */
    describe('New Feed Selection', function () {
        /*
         * 写一个测试保证当用 loadFeed 函数加载一个新源的时候内容会真的改变。
         * 记住，loadFeed() 函数是异步的。
         */
        let $firstContent, $secondContent;

        function randomFromTo(from, to) {
            return Math.floor(Math.random() * (to - from + 1) + from);
        }

        beforeEach(function (done) {
            loadFeed(0, function () {
                $firstContent = $('.feed').first().text();
                loadFeed(randomFromTo(1, allFeeds.length - 1), function () {
                    $secondContent = $('.feed').first().text();
                    done();
                });
            });
        }, 20000); // 增加回调所允许的超时时长

         it('load newFeed normal', function () {
             console.log($firstContent, $secondContent);
             expect($firstContent).not.toBe($secondContent);
         });
    });

}());
