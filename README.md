# UI Components for [PLATO](https://github.com/platojs/plato)

> 小而美，少即多。

[![Travis](https://img.shields.io/travis/platojs/components.svg?style=flat-square)](https://travis-ci.org/platojs/components)
[![Coveralls](https://img.shields.io/coveralls/platojs/components.svg?style=flat-square)](https://coveralls.io/github/platojs/components)

## Principles

Less is More

[若无必要，勿增实体](https://zh.wikipedia.org/wiki/奥卡姆剃刀)

### 设计

非侵入式，尽量在不修改原有 DOM 结构的前提下实现功能，参见 *core/swiper*。

### 目标

#### 近期目标

  编写尽量小的碎片化的组件，方便开发时灵活的组装，以应对多变的需求；

  什么叫小？参见 *core/form*；

  在这里，我们要先将之前使用 *nd-form* 的习惯从记忆中抹去，让一切简单、轻量。

#### 中期目标

  根据实践反馈，持续不断地完善组件；

  参考借鉴外部开源项目，总结工作中的需求，在碎片化的基础上封装一些偏重的组件。

## Components

- Core
  - [x] Avatar
  - [x] Badge
  - [x] Form
    - [x] Button
    - [x] Checkbox (Switcher)
    - [x] Textfield (text, email, password, url, number, search, etc)
    - [x] Multiline
    - [x] Password (with showing password toggle)
  - [x] Icon
  - [x] Image
  - [x] Modal
  - [x] Picker
  - [x] Progress
  - [x] Range
  - [x] Scroller (with pulling up and down)
  - [x] Slider
  - [x] Spinner
  - [x] Swiper
  - [x] Toast
- Misc
  - [x] Paginator
  - [x] Uploader

## Browser Support

- Android 4+
- iOS 7+

## License

[MIT](http://opensource.org/licenses/MIT)
