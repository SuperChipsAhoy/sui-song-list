# SUI的歌单网站

岁己SUI的歌单网站。也可用于简单构建其他vup/vtb的个人歌单网站。

> Fork自 [雨纪Ameki的歌单](https://www.ameki.online/)

## Features

```
# sui-song-list
rules:
+ 永久禁用后台数据统计工具的支持
+ 响应式页面

features:
+ 支持表格歌单显示
  - 默认显示表格
  - 鼠标悬停时，高亮单元格

+ 支持列表歌单显示
  - 在页面宽度小于一定值时，显示列表
  - 鼠标悬停 歌名/歌名翻译 行时，文本后缀显示可复制图标

+ 从xlsx歌单文件自动获取歌单信息
  - 通过 converter.js 构建时 (dev, build) 自动更新
  - base
    - 需要手动调用 converter.exe/converter.py 进行更新
      - source: vup-song-list-main

+ 歌单信息
  - 支持 序号，歌曲名，歌名翻译，原唱，语言，备注，时间，次数，歌切 列数据
    - 歌曲名为空的数据行，被视为空行忽略
    - 时间支持添加多个时间，严格以中文顿号(、)分割，以升序排序
      `2022/9/4，2022/10/4，2023/1/19`
    - 歌切支持B站BV号，B站合集BV号
      `BV[0-9a-zA-Z]{10}` `BV[0-9a-zA-Z]{10}&p=[0-9]+`
      Reference [https://player.bilibili.com/](https://player.bilibili.com/)
      - 歌切支持多BVID，严格以中文顿号(、)分割，顺序无关
        `BV12W4y1R7ZF，BV1xX4y1a73L，BV1Mx4y177yL`
        
  - base
    - source: vup-song-list-main

+ 基础歌单信息显示
  - 支持单页歌单信息显示
    - 支持显示 序号，歌曲名，原唱，语言， 备注 数据
  - base
    - source: vup-song-list-main

+ 基础歌单信息检索
  - 
    - 支持歌名检索
      - 支持搜索歌名，歌名翻译，原唱，语言
    - 支持语言筛选
      - 支持华语，日语，英语筛选
      - 支持华语筛选
        - 支持歌名首字拼音筛选
    
  - base
    - source: vup-song-list-main

+ 基础歌单信息排序
  - 支持排序
    - 最新时间升序
    - 次数升序
    - 默认排序
      - 默认使用歌单信息中的歌曲顺序
  
  - base
    - source: KpwnZ/feat/sort

+ 歌曲音视频播放
  - 
    - Bilibili/video: playable
      - 支持多BVID切换
    - 网易云/audio: linkable
    - suij1sui.space/audio: playable
      - audio player
        - 支持播放/暂停
        - 支持上下首切换，顺序为歌单顺序
      - base
        - source: SuperChipsAhoy/music-player
  - base
    - source: vup-song-list-main

+ 点击歌单自动复制选中歌曲名

+ 显示vup信息
  - 
    - vup头像
    - Bilibili链接
    - Bilibili直播房间链接
    - 微博链接
    - VirtuaReal官网介绍链接
    - Twitter链接
  - base
    - source: vup-song-list-main

+ 支持自定义光标
  - 支持 custom-normal, custom-pointer, custom-text 自定义光标
    - normal, pointer, text, ... 即 css 对应的光标类型，如果不存在，使用对应默认光标
    - 尚未支持自动配置
  - 支持v2版本光标
  - base
    - source: vup-song-list-main

+ 单图背景
  - base
    - source: vup-song-list-main

+ 背景滚动
  - 背景跟随滚动条滚动
  - base
    - source: KpwnZ/dev/ui

```

当前版本用于基础构建并试运行。后续拟添加功能包括但不限于，
+ 支持多主题架构
  - 重构css，改用Tailwind
    - Tailwind CSS 更方便动态配置样式。可以通过config在不修改css样式文件和其他源码文件的情况下更换主题
+ 优化背景图加载机制
+ 添加更多歌单显示和检索功能，如列表项隐藏，和快捷操作等
+ 优化git objects体积
  + 至少50MB左右的大小，当前及未来是无用的 (来自历史提交的二进制可执行文件)
+ 重构并移除冗余/混淆代码 
+ ...

持续更新，
+ 完善歌单信息，显示xlsx歌单文件中的更多内容
+ 基于 *岁己SUI* 个人特色的页面风格
+ 优化页面
+ 完善文档
+ ...

另外，会尽可能同步更新 *岁己SUI* 最新歌单信息。如有歌单方面的遗漏或错误，或者使用时出现BUG，欢迎发issue和pull-request，或者加入Collaborator！

感谢每一位贡献者。

## Related Repositories

+ [song-list-of-nanakaie](https://github.com/alan314m/song-list-of-nanakaie)

+ [vup-song-list](https://github.com/Akegarasu/vup-song-list)

+ [vup-song-list-main](https://github.com/Rndlab/vup-song-list-main)

## Project Authors

This is the list of sui-song-list's significant contributors.

+ [starsJuly](https://github.com/starsJuly)
+ [RinSchomburg](https://github.com/RinSchomburg)

## Project Contributors

为尽可能不遗漏贡献者，此处提供贡献者列表，如包含在Github之外为此项目做出贡献者，包括，
1) 提交代码
2) 提供非源码资源
3) 网站维护
4) 提供错误/BUG的说明
5) 以其他形式提供有效协助

> 如果贡献者希望匿名，不会出现在列表中。

此处工作会存在遗漏，欢迎反馈，会及时进行添加/修改/删除。通常为添加时间的正序，排序不分先后。

+ RinSchomburg
+ starsJuly
+ 蜜柑教信徒
+ 岁己家的维斯
+ 小笨酱_____________
+ KpwnZ
+ SuperChipsAhoy

## License

见LICENSE文件

> 本项目源码，当下及未来均遵循MIT开源协议；本项目，当下及未来均不用于任何商业用途。
> 本项目内非源码资源（图片，音乐，图标等）不可商用，如需商业用途，请另获取商用许可。
