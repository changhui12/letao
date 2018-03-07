$(function() {
    // 将搜索记录存储在本地（只能存储字符串），约定用 search_list 记录

    // 1. 渲染搜索历史列表
    // 1.1 从本地数据中获取要渲染的数据，如果没有数据就返回一个空数组，确保
    // 可以先通过在控制台输入 localStorage.setItem('search_list','["阿迪","耐克","李宁"]')模拟数据
    // 封装一个函数，用于获取搜索历史，返回一个数组
    function getHistory() {
        var history = localStorage.getItem('search_list') || '[]';   
        var arr = JSON.parse(history);
        return arr;
    }
    // getHistory();

    // 1.2 根据数据和模板引擎渲染搜索历史
    function renderHistory() {
        var arr = getHistory();
        $('.lt-history').html(template('historyTpl',{info:arr}));
    }
    renderHistory();

    // 2. 清空历史记录
    $('.lt-history').on('click','.btn_empty',function() {
        // 弹出确认框
        mui.confirm("你确定要清空所有的历史记录吗？","温馨提示", ["是", "否"], function (e) {
            //通过e.index就可以知道点击了那个按钮
            if(e.index === 0){
                // 删除本地存储的search_list 数据
                localStorage.removeItem('search_list');
                // 重新渲染搜索历史
                renderHistory();
            }     
        });           
    })
    
    // 3. 删除单条历史记录
    // 根据点击对象的下标（通过data-index存储了），将数据从数组中删除，并重新渲染
    $('.lt-history').on('click','.btn_delete',function() {
        // 在弹出确认框之前获取下标，或者用一个变量保存 $(this)，因为当点击确认框时，$(this)不再指向.btn_delete
        var index = $(this).data('index');      // 获取下标     
        // 弹出确认框
        mui.confirm('你确定要删除本条数据吗？', '温馨提示', ['是','否'], function(e) {
            if(e.index === 0) {            
                var arr = getHistory();      // 获取数组
                arr.splice(index,1);        // 删除数组的对应下标的元素
                localStorage.setItem('search_list',JSON.stringify(arr));    // 根据更改后的数组重新设置search_list
                renderHistory();        // 重新渲染
            }
        })
        
    })

    // 4. 添加搜索历史
    // 4.1 对按钮注册点击事件
    // 4.2 获取input框中的value值，重置input框内容,如果输入内容为空，弹出消息提示框
    // 4.3 获取记录搜索历史的数组，将value值添加到数组的最前面
    //     4.3.1 当value值在数组中已经存在，删除已存在的元素
    //     4.3.2 控制数组的最大长度为10，当超过10时，删除位置最靠后的元素
    // 4.4 根据数组来重新设置search_list
    // 4.5 重新渲染搜索历史/ 跳转到搜索列表页
    $('.lt-search button').on('click',function() {
        var value = $('.lt-search input').val().trim();
        $('.lt-search input').val('');
        if(value == '') {
            mui.toast("请输入搜索关键字");
            return;
        }
        var arr = getHistory();
        var index = arr.indexOf(value);
        if(index != -1) {
            arr.splice(index,1);
        }
        if(arr.length >=10) {
            arr.pop();
        }
        arr.unshift(value);
        localStorage.setItem('search_list',JSON.stringify(arr));
        // renderHistory();
        location.href = 'searchList.html?key=' + value;
    })
})