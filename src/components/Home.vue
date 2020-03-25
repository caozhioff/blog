<template>
    <div class="main-container">
        <el-row>
            <el-col :span=20>
                <div class="blog-header">
                    <h1>openssl常用命令</h1>
                    <span>本条日志由 cz 发表于 2020年02月09日 15时14分</span>
                    <span>标签：SSL</span>
                </div>
                <div class="blog-content">
                    这是博客内容
                </div>
                <div class="blog-footer">
                    <div class="pull-left">
                        <a href="" class="btn btn-success">
                                新一篇：Airtest自动化测试使用
                        </a>
                    </div>
                    <div class="pull-right">
                        <a href="" class="btn btn-success">
                                前一篇：Airtest自动化测试使用
                        </a>
                    </div>
                </div>
            </el-col>
            <el-col :span=4 class="sidebar">
                <el-input placeholder="search"></el-input>
                <div class="tags">
                    <h3>标签检索</h3>
                    <div>
                        <a href="/tag/php">php</a>
                        <a href="">Vue</a>
                        <a href="">phalcon</a>
                    </div>
                </div>
                <div class="links">
                    <h3>友情链接</h3>
                    <div>
                        <ul>
                            <li><a href="">百度</a></li>
                            <li><a href="">vue</a></li>
                        </ul>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>

</script>

<style>
.main-container{
    width: 1170px;
    padding: 10px 15px 20px;
    margin-left: auto;
    margin-right: auto;
}
.blog-header{
    margin-bottom: 1rem;
}
.blog-header h1 {
    font-size: 36px;
    font-weight: 500;
}
.blog-header span {
    font-size: 12px;
    color: #666;
}
.blog-content {
    margin-bottom: 20px;
}
.blog-footer{
    height: 72px;
}
.pull-left {
    float: left;
}
.pull-right {
    float: right;
}
.btn {
    display: inline-block;
    padding: 6px 12px;
    margin-bottom: 0;
    font-size: 14px;
    font-weight: normal;
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-image: none;
    border: 1px solid transparent;
    border-radius: 4px;
}
.btn-success {
    color: #fff;
    background-color: #5cb85c;
    border-color: #4cae4c;
}
.sidebar {
    padding-left: 20px;
}
.tags a {
    color: #337ab7;
    margin-left: 5px;
}
.links ul {
    list-style: none;
    padding-left: 0;
}
.links ul li {
    margin-top: 3px;
}
.links ul li a {
    color: #337ab7;
}
</style>