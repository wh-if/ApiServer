import { Controller, HttpMethodEnum } from "../model";
import { AjaxResult } from "../util/AjaxResult";

const controller: Controller[] = [
  // 获取Banner
  {
    path: "/banner",
    method: HttpMethodEnum.GET,
    handler: async (ctx) => {
      ctx.body = AjaxResult.success(data);
    },
  },
];

export default controller;

// 模拟数据
const data = [
  {
    id: 768,
    pageId: 2,
    position: 5,
    isValid: null,
    bannerTitle: "Z7开售",
    status: 1,
    isTiming: 1,
    startTime: "2023-03-24 10:00:00",
    endTime: "2023-04-04 00:00:00",
    bannerUrl: "https://shop.vivo.com.cn/product/10008220",
    isComponent: 1,
    bannerDetail:
      '<div class="structure-module">\n    <div class="sm-wrapper">\n        <img class="j_bgImage" data-ratio="1.48" data-src="https://shopstatic.vivo.com.cn/vivoshop/commodity/20230323/20230323190246622126_original.jpg">\n        \n    </div>\n</div>',
    bannerPic: "http://localhost:8080/static/banner_1.jpg",
  },
  {
    id: 743,
    pageId: 2,
    position: 6,
    isValid: null,
    bannerTitle: "S16开售",
    status: 1,
    isTiming: 1,
    startTime: "2023-03-28 00:00:00",
    endTime: "2023-04-04 00:00:00",
    bannerUrl: "https://shop.vivo.com.cn/product/10008043",
    isComponent: 1,
    bannerDetail:
      '<div class="structure-module">\n    <div class="sm-wrapper">\n        <img class="j_bgImage" data-ratio="1.48" data-src="https://shopstatic.vivo.com.cn/vivoshop/commodity/20230327/20230327114425521136_original.jpg">\n        \n    </div>\n</div>',
    bannerPic: "http://localhost:8080/static/banner_2.png",
  },
  {
    id: 738,
    pageId: 2,
    position: 7,
    isValid: null,
    bannerTitle: "iQOO 11",
    status: 1,
    isTiming: 1,
    startTime: "2023-03-28 00:00:00",
    endTime: "2023-04-04 00:00:00",
    bannerUrl: "https://shop.vivo.com.cn/product/10007952",
    isComponent: 1,
    bannerDetail:
      '<div class="structure-module">\n    <div class="sm-wrapper">\n        <img class="j_bgImage" data-ratio="1.48" data-src="https://shopstatic.vivo.com.cn/vivoshop/commodity/20230213/20230213190023562355_original.jpg">\n        \n    </div>\n</div>',
    bannerPic: "http://localhost:8080/static/banner_3.jpg",
  },
  {
    id: 759,
    pageId: 2,
    position: 8,
    isValid: null,
    bannerTitle: "X90",
    status: 1,
    isTiming: 1,
    startTime: "2023-03-28 00:00:00",
    endTime: "2023-04-04 00:00:00",
    bannerUrl: "https://shop.vivo.com.cn/product/10007932",
    isComponent: 1,
    bannerDetail:
      '<div class="structure-module">\n    <div class="sm-wrapper">\n        <img class="j_bgImage" data-ratio="1.48" data-src="https://shopstatic.vivo.com.cn/vivoshop/commodity/20230306/20230306211604225567_original.jpg">\n        \n    </div>\n</div>',
    bannerPic: "http://localhost:8080/static/banner_4.jpg",
  },
  {
    id: 766,
    pageId: 2,
    position: 12,
    isValid: null,
    bannerTitle: "vivo tws air 169起",
    status: 1,
    isTiming: 1,
    startTime: "2023-03-21 00:00:00",
    endTime: "2023-04-01 00:00:00",
    bannerUrl: "https://shop.vivo.com.cn/product/10007427?spuId=10007427",
    isComponent: 1,
    bannerDetail:
      '<div class="structure-module">\n    <div class="sm-wrapper">\n        <img class="j_bgImage" data-ratio="1.48" data-src="https://shopstatic.vivo.com.cn/vivoshop/commodity/20230320/2023032016221792287_original.png">\n        \n    </div>\n</div>',
    bannerPic: "http://localhost:8080/static/banner_5.jpg",
  },
];
