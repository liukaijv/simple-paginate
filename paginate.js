/**
* 简单分页插件
* author:noop
*/
; (function($) {

    $.fn.paginate = function(option) {

        var defaults = {
            currentPage: 1,
            //当前页码
            totalItem: 200,
            //总条目数                   
            pageSize: 10,
            //每页条目
            showPage: 10,
            //每次显示多少页                
            onClick: null,
            //点击页码回调,
            activeClass: 'active',
            //当前页class
            prevText: 'prev',
            //上一页文字
            nextText: 'next' //下一页文字
        }

        return this.each(function() {
            var opts = $.extend(defaults, option || {}),
            _this = this,
            ele = $(this);

            // 传入的是个数还是页数
            if (!opts.totalPage) {
                opts.totalPage = Math.ceil(opts.totalItem / opts.pageSize);
            }

            if (opts.currentPage < 1) {
                opts.currentPage = 1;
            }

            if (opts.currentPage > opts.totalPage) {
                opts.currentPage = opts.totalPage;
            }

            function renderHtml(currentPage, totalPage, showPage) {
                var iterator, outHtml = '';
                // 总页数小于展示数目
                if (totalPage <= showPage) {
                    for (iterator = 1; iterator <= totalPage; iterator++) {
                        if (currentPage == iterator) {
                            outHtml += '<a class="' + opts.activeClass + '" >' + iterator + '</a>'
                        } else {
                            outHtml += '<a href="javascript:;" data-page="' + iterator + '">' + iterator + '</a>'
                        }
                    }
                } else { // 总页数大于展示数目                             
                    if (parseInt((currentPage - 1) / showPage) == 0) {
                        // 当前分页小于展示数目  
                        for (iterator = 1; iterator <= showPage; iterator++) {
                            if (currentPage == iterator) {
                                outHtml += '<a class="' + opts.activeClass + '" >' + iterator + '</a>'
                            } else {
                                outHtml += '<a href="javascript:;" data-page="' + iterator + '">' + iterator + '</a>'
                            }
                        }
                        outHtml += '<a href="javascript:;" data-page="' + iterator + '">' + opts.nextText + '</a>';
                    } else if (parseInt((currentPage - 1) / showPage) == parseInt(totalPage / showPage)) {
                        outHtml += '<a href="javascript:;" data-page="' + (parseInt((currentPage - 1) / showPage) * showPage) + '">' + opts.prevText + '</a>';
                        for (iterator = parseInt(totalPage / showPage) * showPage + 1; iterator <= totalPage; iterator++) {
                            if (currentPage == iterator) {
                                outHtml += '<a class="' + opts.activeClass + '" >' + iterator + '</a>'
                            } else {
                                outHtml += '<a href="javascript:;" data-page="' + iterator + '">' + iterator + '</a>'
                            }
                        }
                    } else {
                        outHtml += '<a href="javascript:;" data-page="' + (parseInt((currentPage - 1) / 10) * 10) + '">' + opts.prevText + '</a>';
                        for (iterator = parseInt((currentPage - 1) / showPage) * showPage + 1; iterator <= parseInt((currentPage - 1) / showPage) * showPage + showPage; iterator++) {
                            if (currentPage == iterator) {
                                outHtml += '<a class="' + opts.activeClass + '" >' + iterator + '</a>'
                            } else {
                                outHtml += '<a href="javascript:;" data-page="' + iterator + '">' + iterator + '</a>'
                            }
                        }
                        //最后一页时的处理
                        if ((parseInt((currentPage - 1) / showPage) * showPage + showPage) < totalPage) {
                            outHtml += '<a href="javascript:;" data-page="' + iterator + '">' + opts.nextText + '</a>';
                        }
                    }
                }
                ele.html(outHtml);
            }

            ele.on('click', '[data-page]',
            function() {
                var page = $(this).data('page');
                if (page) {
                    renderHtml(page, opts.totalPage, opts.showPage);
                    //点击页码时的回调
                    if ($.isFunction(opts.onClick)) {
                        opts.onClick.call(_this, page);
                    }
                }
            });

            // 生成html
            renderHtml(opts.currentPage, opts.totalPage, opts.showPage);

        });

    }
} (jQuery));