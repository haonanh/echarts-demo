(function () {
    $('.monitor .tabs').on('click', 'a', function () {
        $(this).addClass('active').siblings('a').removeClass('active')
        $('.monitor .content').eq($(this).index()).show().siblings('.content').hide()
    })
    $('.marquee-view .marquee').each(function () {
        // console.log($(this));
        const rows = $(this).children().clone()
        $(this).append(rows)
    })
})();
// 南格丁儿玫瑰图
(function () {
    const myChart = echarts.init(document.querySelector('.pie'))
    myChart.setOption({
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        // 注意color的位置
        color: ['#006cff', '#60cda0', '#ed8884', '#ff9f7f', '#0096ff', '#9fe6b8', '#32c5e9', '#1d9dff'],
        series: [
            {
                name: '点位分布',
                type: 'pie',
                radius: ['10%', '70%'],
                center: ['50%', '50%'],
                roseType: 'radius',
                itemStyle: {
                    borderRadius: 5
                },
                label: {
                    fontSize: 10
                },
                labelLine: {
                    length: 6,
                    length2: 8
                },
                data: [
                    { value: 20, name: '云南' },
                    { value: 26, name: '北京' },
                    { value: 24, name: '山东' },
                    { value: 25, name: '河北' },
                    { value: 20, name: '江苏' },
                    { value: 25, name: '浙江' },
                    { value: 30, name: '四川' },
                    { value: 42, name: '湖北' }
                ]
            }
        ]
    })
    // 图表跟着浏览器缩放一起缩放
    window.addEventListener('resize', function () {
        myChart.resize()
    })
})();

// 柱状图
(function () {
    const myChart = echarts.init(document.querySelector('.bar'))
    myChart.setOption({
        tooltip: {
            trigger: 'item'
        },
        color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
                offset: 0, color: '#00fffb' // 0% 处的颜色
            }, {
                offset: 1, color: '#0061ce' // 100% 处的颜色
            }],
            globalCoord: false // 缺省为 false
        },
        grid: {
            left: '0%',
            right: '3%',
            bottom: '3%',
            //  图表位置紧贴画布边缘是否显示刻度以及label文字 防止坐标轴标签溢出跟grid 区域有关系
            containLabel: true,
            // 是否显示直角坐标系网格
            show: true,
            //grid 四条边框的颜色
            borderColor: 'rgba(0, 240, 255, 0.3)'
        },
        xAxis: [
            {
                type: 'category',
                // xAxis
                data: ['上海', '广州', '北京', '深圳', '合肥', '', '......', '', '杭州', '厦门', '济南', '成都', '重庆'],
                axisTick: {
                    alignWithLabel: false,
                    show: false
                },
                // 修改x坐标轴标签颜色
                axisLabel: {
                    color: '#4c9bfd'
                },
                // 修改x坐标轴边框颜色
                axisLine: {
                    lineStyle: {
                        color: 'rgba(0, 240, 255, 0.3)'
                    }
                }
            }

        ],
        yAxis: [
            {
                type: 'value',
                axisTick: {
                    show: false
                },
                axisLabel: {
                    color: '#4c9bfd'
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(0, 240, 255, 0.3)'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: 'rgba(0, 240, 255, 0.3)'
                    }
                }
            }
        ],
        series: [
            {
                name: '',
                type: 'bar',
                barWidth: '60%',
                data: [2100, 1900, 1700, 1560, 1400, {
                    name: '',
                    value: 1200,
                    itemStyle: {
                        color: '#254065'
                    },
                    emphasis: {
                        itemStyle: {
                            color: '#254065'
                        }
                    },
                    tooltip: {
                        extraCssText: 'opacity:0'
                    }
                }, {
                        name: '',
                        value: 1200,
                        itemStyle: {
                            color: '#254065'
                        },
                        emphasis: {
                            itemStyle: {
                                color: '#254065'
                            }
                        },
                        tooltip: {
                            extraCssText: 'opacity:0'
                        }
                    }, {
                        name: '',
                        value: 1200,
                        itemStyle: {
                            color: '#254065'
                        },
                        emphasis: {
                            itemStyle: {
                                color: '#254065'
                            }
                        },
                        tooltip: {
                            extraCssText: 'opacity:0'
                        }
                    }, 900, 750, 600, 480, 240]
            }
        ]
    })
    // 图表跟着浏览器缩放一起缩放
    window.addEventListener('resize', function () {
        myChart.resize()
    })
})();

// 订单区域
(function () {
    // 1. 准备数据
    var data = {
        day365: { orders: '20,301,987', amount: '99834' },
        day90: { orders: '301,987', amount: '9834' },
        day30: { orders: '1,987', amount: '3834' },
        day1: { orders: '987', amount: '834' }
    }
    // 获取对应标签
    let $h4Order = $('.order  h4').eq(0)
    let $h4Count = $('.order h4').eq(1)
    let index = 0
    $('.order .filter').on('click', 'a', function () {
        // 高亮样式
        $(this).addClass('active').siblings('a').removeClass('active')
        // 切换数据
        var obj = data[this.dataset.key]
        $h4Order.html(obj.orders)
        $h4Count.html(obj.amount)
        // 保存点击时的索引
        index = $(this).index()
    })
    let timer = setInterval(function () {
        index++
        if (index >= 4) index = 0
        $('.order .filter a').eq(index).click()
    }, 1500)
    $('.order').hover(function () {
        clearInterval(timer)
    }, function () {
        clearInterval(timer)
        timer = setInterval(function () {
            index++
            if (index >= 4) index = 0
            $('.order .filter a').eq(index).click()
        }, 1500)
    })
})();

// 折线图
(function () {
    var data = {
        year: [
            [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
            [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79]
        ],
        quarter: [
            [23, 75, 12, 97, 21, 67, 98, 21, 43, 64, 76, 38],
            [43, 31, 65, 23, 78, 21, 82, 64, 43, 60, 19, 34]
        ],
        month: [
            [34, 87, 32, 76, 98, 12, 32, 87, 39, 36, 29, 36],
            [56, 43, 98, 21, 56, 87, 43, 12, 43, 54, 12, 98]
        ],
        week: [
            [43, 73, 62, 54, 91, 54, 84, 43, 86, 43, 54, 53],
            [32, 54, 34, 87, 32, 45, 62, 68, 93, 54, 54, 24]
        ]
    }
    const myChart = echarts.init(document.querySelector('.line'))
    let option = {
        color: ['#00f2f1', '#ed3f35'],
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['预期销售额', '实际销售额'],
            right: '10%',
            textStyle: {
                color: '#4c9bfd'
            }
        },
        grid: {
            top: '20%',
            left: '3%',
            right: '4%',
            bottom: '3%',
            show: true,
            borderColor: '#012f4a',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            axisTick: {
                show: false
            },
            axisLabel: {
                color: '#4c9bfd'
            },
            axisLine: {
                show: false
            },
            boundaryGap: false
        },
        yAxis: {
            type: 'value',
            axisTick: {
                show: false
            },
            axisLabel: {
                color: '#4c9bfd'
            },
            splitLine: {
                lineStyle: {
                    color: '#012f4a'
                }
            }
        },
        series: [
            {
                name: '预期销售额',
                data: data.year[0],
                type: 'line',
                smooth: true
            }, {
                name: '实际销售额',
                data: data.year[1],
                type: 'line',
                smooth: true
            }
        ]
    }
    myChart.setOption(option)
    let index = 0
    $('.sales .caption').on('click', 'a', function () {
        $(this).addClass('active').siblings('a').removeClass('active')
        console.log($(this));
        const arr = data[this.dataset.type]
        console.log(arr);
        // $(this).index()是1 是指当前元素在父元素内的index，父元素.caption 还有个h3元素
        index = $(this).index() - 1
        option.series[0].data = arr[0]
        option.series[1].data = arr[1]
        myChart.setOption(option)
    })
    const as = $('.sales .caption a')
    let timer = setInterval(function () {
        index++;
        if (index >= 4) index = 0;
        as.eq(index).click();
    }, 1500)
    $('.sales').hover(function () {
        clearInterval(timer)
    }, function () {
        clearInterval(timer)
        timer = setInterval(function () {
            index++;
            if (index >= 4) index = 0;
            as.eq(index).click();
        }, 1500)
    })
    // 图表跟着浏览器缩放一起缩放
    window.addEventListener('resize', function () {
        myChart.resize()
    })
})();

// 雷达图
(function () {
    const myChart = echarts.init(document.querySelector('.radar'))
    const dataBJ = [
        [90, 19, 56, 11, 34]
    ]
    var option = {
        radar: {
            indicator: [
                { name: '机场', max: 100 },
                { name: '商场', max: 100 },
                { name: '火车站', max: 100 },
                { name: '汽车站', max: 100 },
                { name: '地铁', max: 100 }
            ],
            radius: '60%',
            shape: 'circle',
            splitNumber: 4,
            splitLine: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.5)'
                }
            },
            splitArea: {
                show: false
            },
            name: {
                // 修饰雷达图文本颜色
                textStyle: {
                    color: '#4c9bfd'
                }
            },
            axisLine: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.5)'
                }
            }
        },
        tooltip: {
            show: true,
            position: ['60%', '10%']
        },
        series: [
            {
                name: '北京',
                type: 'radar',
                lineStyle: {
                    normal: {
                        color: '#fff'
                    }
                },
                data: dataBJ,
                // 雷达图上拐点形状
                symbol: 'circle',
                // 拐点颜色
                itemStyle: {
                    color: '#fff'
                },
                // 拐点大小
                symbolSize: 5,
                // 拐点显示相关数据
                label: {
                    show: true,
                    fontSize: 10
                },
                areaStyle: {
                    color: 'rgba(238, 197, 102, 0.6)'
                }
            }
        ]
    }
    myChart.setOption(option)
    // 图表跟着浏览器缩放一起缩放
    window.addEventListener('resize', function () {
        myChart.resize()
    })
})();

// 饼形图
(function () {
    const myChart = echarts.init(document.querySelector('.gauge'))
    let option = {
        series: [
            {
                name: '销售进度',
                type: 'pie',
                radius: ['130%', '150%'],
                center: ['48%', '80%'],
                labelLine: {
                    show: false
                },
                startAngle: 180,
                // 鼠标经过不变大
                hoverOffset: 0,
                data: [
                    {
                        value: 100, itemStyle: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: "#00c9e0" // 0% 处的颜色
                                }, {
                                    offset: 1, color: "#005fc1"  // 100% 处的颜色
                                }],
                                globalCoord: false // 缺省为 false
                            }
                        }
                    },
                    {
                        value: 100, itemStyle: {
                            color: '#12274d'
                        }
                    },
                    {
                        value: 200,
                        itemStyle: {
                            color: 'transparent'
                        }
                    },
                ]
            }
        ]
    }
    myChart.setOption(option)
    // 图表跟着浏览器缩放一起缩放
    window.addEventListener('resize', function () {
        myChart.resize()
    })
})();

// 热销排行
(function () {
    var hotData = [
        {
            city: '北京',  // 城市
            sales: '25, 179',  // 销售额
            flag: true, //  上升还是下降
            brands: [   //  品牌种类数据
                { name: '可爱多', num: '9,086', flag: true },
                { name: '娃哈哈', num: '8,341', flag: true },
                { name: '喜之郎', num: '7,407', flag: false },
                { name: '八喜', num: '6,080', flag: false },
                { name: '小洋人', num: '6,724', flag: false },
                { name: '好多鱼', num: '2,170', flag: true },
            ]
        },
        {
            city: '河北',
            sales: '23,252',
            flag: false,
            brands: [
                { name: '可爱多', num: '3,457', flag: false },
                { name: '娃哈哈', num: '2,124', flag: true },
                { name: '喜之郎', num: '8,907', flag: false },
                { name: '八喜', num: '6,080', flag: true },
                { name: '小洋人', num: '1,724', flag: false },
                { name: '好多鱼', num: '1,170', flag: false },
            ]
        },
        {
            city: '上海',
            sales: '20,760',
            flag: true,
            brands: [
                { name: '可爱多', num: '2,345', flag: true },
                { name: '娃哈哈', num: '7,109', flag: true },
                { name: '喜之郎', num: '3,701', flag: false },
                { name: '八喜', num: '6,080', flag: false },
                { name: '小洋人', num: '2,724', flag: false },
                { name: '好多鱼', num: '2,998', flag: true },
            ]
        },
        {
            city: '江苏',
            sales: '23,252',
            flag: false,
            brands: [
                { name: '可爱多', num: '2,156', flag: false },
                { name: '娃哈哈', num: '2,456', flag: true },
                { name: '喜之郎', num: '9,737', flag: true },
                { name: '八喜', num: '2,080', flag: true },
                { name: '小洋人', num: '8,724', flag: true },
                { name: '好多鱼', num: '1,770', flag: false },
            ]
        },
        {
            city: '山东',
            sales: '20,760',
            flag: true,
            brands: [
                { name: '可爱多', num: '9,567', flag: true },
                { name: '娃哈哈', num: '2,345', flag: false },
                { name: '喜之郎', num: '9,037', flag: false },
                { name: '八喜', num: '1,080', flag: true },
                { name: '小洋人', num: '4,724', flag: false },
                { name: '好多鱼', num: '9,999', flag: true },
            ]
        }
    ]
    let supHtml = ''
    // 封装的渲染函数
    const render = function (currentEle) {
        currentEle.addClass('active').siblings('li').removeClass('active')
        // 通过当前标签对象的索引来获取对应的 brands数组数据
        let brands = hotData[currentEle.index()].brands
        let subHtml = ''
        $.each(brands, function (index, item) {
            subHtml += `<li><span>${item.name}</span><span>${item.num} <s class="${item.flag ? 'icon-up' : 'icon-down'}"></s></span></li>`
        })
        $('.sub').html(subHtml)
    }

    // 将城市渲染到页面
    $.each(hotData, function (index, item) {
        supHtml += `<li><span>${item.city}</span><span>${item.sales} <s class="${item.flag ? 'icon-up' : 'icon-down'}"></s><span></li>`
    })
    $('.sup').html(supHtml)

    let index = 0
    // 不同城市的销售
    $('.province .sup').on('mouseenter', 'li', function () {
        index = $(this).index()
        render($(this))
    })

    // 默认高亮显示第一个小li  北京
    let lis = $('.province .sup li')
    lis.eq(0).mouseenter()
    // 默认自动切换
    let timer = setInterval(function () {
        index++
        if (index >= 5) index = 0
        render(lis.eq(index))
    }, 1500)

    // 鼠标进入  和  鼠标离开事件
    $('.province .sup').hover(function () {
        // 进入时暂停切换
        clearInterval(timer)
    }, function () {
        // 离开时继续定时器切换
        clearInterval(timer)
        timer = setInterval(function () {
            index++
            if (index >= 5) index = 0
            render(lis.eq(index))
        }, 1500)
    })
})();