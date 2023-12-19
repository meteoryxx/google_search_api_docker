
创建一个简单的Express服务器，它提供了一个端点/search，用于接收客户端的搜索请求并使用Google Custom Search API进行搜索。服务器的主要功能是接收一个搜索关键词和一个密码，验证密码，然后使用Google的API获取搜索结果。

上传和解压文件google-search-service.tar
```
mkdir google-search-service
cd google-search-service
tar -xvf google-search-service.tar
```
参考下面的链接申请API并修改.env
https://zhuanlan.zhihu.com/p/174666017
```
GOOGLE_SEARCH_KEY=你的GOOGLE_SEARCH_KEY
GOOGLE_CX_ID=你的GOOGLE_CX_ID
PORT=3000
SEARCH_PASSWORD=你的密码
```
生成容器并调用
```
docker build -t google-search-service .
docker run -p 3000:3000 -d --env-file .env google-search-service
```

接口可以提供给fastgpt调用


![00691a7e9fbf6d789529784eaf32e54](https://github.com/meteoryxx/google_search_api_docker/assets/11530764/a5ed59d4-c982-4f44-b4ae-859d102e4752)
