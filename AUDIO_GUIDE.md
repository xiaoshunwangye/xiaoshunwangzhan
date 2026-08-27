# 音频播放列表使用说明

## 如何添加新音乐

1. 将音乐文件放入 `public/audio/` 文件夹
   - 支持格式: mp3, wav, ogg, m4a, flac

2. 编辑 `public/audio-list.json` 文件，添加新歌曲信息：
   ```json
   {
     "playlist": [
       {"name": "踏浪", "src": "/audio/踏浪.mp3"},
       {"name": "精卫", "src": "/audio/精卫.mp3"},
       {"name": "新歌曲名", "src": "/audio/新歌曲.mp3"}
     ]
   }
   ```

## 示例：添加新歌曲

假设你有一首新的音乐文件 `我的歌.mp3`：

1. 复制文件到 `public/audio/我的歌.mp3`
2. 在 `audio-list.json` 中添加：
   ```json
   {"name": "我的歌", "src": "/audio/我的歌.mp3"}
   ```

## 功能特性

- ✅ 自动播放第一首歌（点击页面任意位置触发）
- ✅ 进度条可点击跳转
- ✅ 音量调节
- ✅ 播放列表切换
- ✅ 下一首自动播放
- ✅ 单曲循环（仅一首歌时）
