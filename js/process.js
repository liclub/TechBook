function valBetween(v, min, max) {
    return (Math.min(max, Math.max(min, v)));
}
var delay = 2000,
    value = 0,
    valueStore = 0,
    tick = 1,
    tickStore = 1;

function loop(id) {
    value = Math.ceil(Math.random() * 100);
    tick = valBetween(Math.ceil((value / 100) * 28), 1, 28);
    var counter = 0,
        tickStoreTemp = tickStore;
    if (value > valueStore) {
        for (i = tickStoreTemp; i <= tick; i++) {
            (function (i) {
                setTimeout(function () {
                    $('#' + id + ' path:nth-child(' + i + ')').show();
                }, 50 * counter);
                counter++;
            }(i));
        }
    } else if (value < valueStore) {
        for (i = tickStoreTemp; i >= tick; i--) {
            (function (i) {
                setTimeout(function () {
                    $('#' + id + ' path:nth-child(' + i + ')').hide();
                }, 50 * counter);
                counter++;
            }(i));
        }
    }
    valueStore = value;
    tickStore = tick;
    window.setTimeout(loop, delay);
};
// loop('gauge')
// loop('gauge1')
// loop('gauge2')
// loop('gauge3')
// loop('gauge4')
// loop('gauge5')

function scrollLoop(id, num) {
    var counter = 0;
    for (i = 0; i <= num; i++) {
        (function (i) {
            setTimeout(function () {
                $('#' + id + ' path:nth-child(' + i + ')').show();
            }, 50 * counter);
            counter++;
        }(i));
    }
}
scrollLoop('gauge', 18)
scrollLoop('gauge1', 13)
scrollLoop('gauge2', 22)
scrollLoop('gauge3', 21)
scrollLoop('gauge4', 5)
scrollLoop('gauge5', 28)


function initEChart(value,lineColor) {
    var dom = document.getElementById("smothTable");
    var defaultVlue = value ? value : [0, 352, 100, 534, 95, 236];
    var color = lineColor ? [lineColor] : ['rgba(23, 255, 243'];
    var lineY = []
    var myChart = echarts.init(dom);
    var app = {};
    var charts = {
        unit: '',
        names: ['', ''],
        lineX: ['1月', '2月', '3月', '4月', '5月', '6月'],
        value: [
            defaultVlue
        ]

    }
    for (var i = 0; i < charts.names.length; i++) {
        var x = i
        if (x > color.length - 1) {
            x = color.length - 1
        }
        var data = {
            name: charts.names[i],
            type: 'line',
            color: color[x] + ')',
            smooth: true,
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: color[x] + ', 0.3)'
                    }, {
                        offset: 0.8,
                        color: color[x] + ', 0)'
                    }], false),
                    shadowColor: 'rgba(0, 0, 0, 0.1)',
                    shadowBlur: 10
                }
            },
            symbol: 'circle',
            symbolSize: 5,
            data: charts.value[i]
        }
        lineY.push(data)
    }
    var chartOptions = {
        backgroundColor: '',
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: charts.names,
            textStyle: {
                fontSize: 12,
                color: 'rgb(0,253,255,0.6)'
            },
            right: '4%'
        },
        grid: {
            top: '14%',
            left: '4%',
            right: '4%',
            bottom: '12%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: charts.lineX,
            axisLabel: {
                textStyle: {
                    color: '#768797'
                },
                formatter: function (params) {
                    return params
                }
            }
        },
        yAxis: {
            name: charts.unit,
            type: 'value',
            axisLabel: {
                formatter: '{value}',
                textStyle: {
                    color: '#768797'
                }
            },
            splitLine: {
                lineStyle: {
                    color: '#1d3a5d'
                }
            },
            axisLine: {
                lineStyle: {
                    color: '#1d3a5d'
                }
            }
        },
        series: lineY
    }
    if (chartOptions && typeof chartOptions === "object") {
        myChart.setOption(chartOptions, true);
    }
}






/* 
测试用配置
 */
const options = [{}, {
    duration: 12000,
    double: false
}, {
    duration: 4000,
    'border-color': 'red',
    'easing': 'ease-in-out'
}, {
    'borderWidth': 2,
    'border-color': '#00f4fd',

}, {
    'borderWidth': 1
}]



/***************************      主 体 代 码       ********************************/

//传入dom元素与 配置即可
function _initDanceBorder(el, options = {}) {
    //默认设置  尺寸单位均为px
    let _options = {
        //边框模糊度  
        blur: 1,
        //距依赖元素距离 
        margin: -5,
        //边框宽度  
        borderWidth: 2,
        //转一周时长  
        duration: 8000,
        //运动效果  default:匀速
        easing: 'linear',
        //是否两条运动线  默认两条
        double: false,
        //渐变色边框 优先级高  若使用渐变色或图片背景  请正确传入该值  否则边框不会显示
        'border-image': 'linear-gradient(to bottom right, #12c2e9,#c471ed,#f64f59) 10 10',
        //边框色   border-image 优先级低
        'border-color': '#00f4fd'
    }

    //存在正常色 不存在渐变色   渐变色赋值为空
    options['border-color'] && !options['border-image'] && (_options['border-image'] = 'none')
    //设置拷贝
    Object.keys(_options).forEach(key => {
        options[key] && (_options[key] = options[key]);
        //double 的特殊判断
        if (key == 'double' && typeof options[key] == 'boolean') {
            _options[key] = options[key]
        }
    })

    //元素基本属性
    const styleObj = {
        'content': '',
        'z-index': -1,
        'margin': `${_options.margin}px`,
        'border': `${_options.borderWidth}px solid`,
        'border-color': _options['border-color'],
        'border-image': _options['border-image'],
        'filter': `blur(${_options.blur}px)`,
        'position': 'absolute',
        'top': 0,
        'bottom': 0,
        'left': 0,
        'right': 0
    }

    const pW = el.offsetWidth || el.style.width;
    const pH = el.offsetHeight || el.style.height;

    const fullWidth = pW + _options.margin * -2;
    const fullHeight = pH + _options.margin * -2;

    //四边切割数组
    const rectArray = [
        `rect(${-_options.blur}px, ${fullWidth}px, ${-_options.margin}px, ${-_options.blur}px)`,
        `rect(0px, ${-_options.margin}px, ${fullHeight + _options.blur}px, ${-_options.blur}px)`,
        `rect(${pH}px, ${fullWidth + _options.blur}px, ${fullHeight + _options.blur}px, 0px)`,
        `rect(${-_options.blur}px, ${fullWidth + _options.blur}px, ${fullHeight}px, ${pW + _options.blur}px)`
    ]

    const clipAnimate = [{
            clip: rectArray[0]
        },
        {
            clip: rectArray[1],
            offset: 0.25
        },
        {
            clip: rectArray[2],
            offset: 0.5
        },
        {
            clip: rectArray[3],
            offset: 0.75
        },
        {
            clip: rectArray[0],
            offset: 1
        }
    ];

    //由于border的可见特性使delay无效  第二条延迟一半的边动画   从0.5开始  
    const clipAnimateTwo = [{
            clip: rectArray[2]
        },
        {
            clip: rectArray[3],
            offset: 0.25
        },
        {
            clip: rectArray[0],
            offset: 0.5
        },
        {
            clip: rectArray[1],
            offset: 0.75
        },
        {
            clip: rectArray[2],
            offset: 1
        }
    ];

    const animateOption = {
        duration: _options.duration,
        iterations: Infinity,
        easing: _options.easing
    };

    const section = initBaseEl();
    console.log(clipAnimate)
    //Web Animations  实现keyframes动画
    section.animate(clipAnimate, animateOption);

    //是否两条运动线
    if (_options.double) {
        let sectionTwo = initBaseEl();
        sectionTwo.animate(clipAnimateTwo, animateOption);
    }

    //构造元素
    function initBaseEl() {
        const section = document.createElement("section");
        //style属性赋值
        Object.keys(styleObj).forEach(key => {
            section.style[key] = styleObj[key]
        })

        el.appendChild(section);

        return section;
    }
    //页面尺寸改变  修改
}