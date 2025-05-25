"use client";
import React, { useState } from "react";
import ReactDOMServer from 'react-dom/server';

interface CrawlItem {
  newsId: string;
  press: string;
  url: string;
  title: string;
  summary: string;
  images_with_desc: ImagesWithDesc[];
  updatedAt: string;
}

interface ImagesWithDesc {
  alt: string;
  desc: string;
  src: string;
}

interface CrawlUrl {
  newsId: string;
  url: string;
  title: string;
  press: string;
  createdAt: string;
  updatedAt: string;
  postTime: string;
  crawled: boolean;
}

type OpenDetail = (item: { [key: string]: any }) => void;


// api
const apiGetBase = async (url: string) => {
  return await fetch(url, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'GET',
  })
    .then(res => res.json())
}

const fetchAllData = async () => await apiGetBase('/api/crawler/getAllData?size=10');
const fetchAllDataLength = async () => await apiGetBase('/api/crawler/getAllDataLength');
const fetchAllUrls = async () : Promise<CrawlUrl[]> => await apiGetBase('/api/crawler/getAllUrls?size=10');
const fetchAllUrlsLength = async () => await apiGetBase('/api/crawler/getAllUrlsLength');


function BaseTable({ headerNames, items, colsWidth, openDetail }:
  {
    headerNames: string[],
    items: Record<string, string | number | boolean>[],
    colsWidth: number[],
    openDetail: OpenDetail
  }) {
  if (!items?.length) return <div></div>

  colsWidth = [1, ...colsWidth, 1]
  const rate = 100 / colsWidth.reduce((total, curr) => total + curr)

  const HeaderNames = ({ headerNames }: { headerNames: string[] }) => {
    headerNames = ['#', ...headerNames, '前往']
    return (
      <thead>
        <tr>
          {headerNames.map((headerName, idx) => (
            <th key={idx} style={{ width: `${colsWidth[idx] * rate}%` }} >{headerName}</th>
          ))}
        </tr>
      </thead>
    )
  }
  const BodyValues = ({ index, item, headerNames }:
    { index: number, item: Record<string, string | number | boolean>, headerNames: string[] }
  ) => {
    const values = headerNames.map(headerName => item[headerName])
    const bodyValues = [index, ...values, 'go']
    return (
      <tr>
        {bodyValues.map((bodyValue, idx) => {
          return (bodyValue !== 'go')
            ? (typeof bodyValue === 'boolean')
              ? <td key={idx}><img src={bodyValue ? 'https://cdn-icons-png.flaticon.com/512/4315/4315445.png' : 'https://cdn-icons-png.flaticon.com/512/9426/9426995.png'} /></td>
              : <td key={idx}>{`${bodyValue}`}</td>
            : (
              <td key={idx}>
                <a onClick={() => openDetail(item)}>{`${bodyValue}`}</a>
              </td>
            )
        })}
      </tr>
    )
  }

  return (
    <table className="table-base">
      <HeaderNames headerNames={headerNames} />
      <tbody>
        {items.map((item, idx) => (
          <BodyValues key={idx} index={idx} item={item} headerNames={headerNames} />
        ))}
      </tbody>
    </table>
  )
}

function CrawlItemsTable({ crawlItems }: { crawlItems: CrawlItem[] }) {
  const CrawlItemsTableElement = ({ index, crawlItem }: { index: number, crawlItem: CrawlItem }) => {
    const InformationDom = ({ crawlItem }: { crawlItem: CrawlItem }) => {
      const { images_with_desc, summary } = crawlItem;
      return (
        <div className="information-base">
          <div className="summary">{summary}</div>
          <table>
            <thead>
              <tr>
                <th className="col-xs-6">圖片</th>
                <th className="col-xs-6">描述 desc</th>
                <th className="col-xs-6">alt</th>
              </tr>
            </thead>
            <tbody>
              {images_with_desc.map((image_with_desc, index) => (
                <tr className="information-image-base" key={index}>
                  <td className="col-xs-6"><img src={image_with_desc.src} /></td>
                  <td className="col-xs-6"><div className="desc">{image_with_desc.desc}</div></td>
                  <td className="col-xs-6"><div className="alt">{image_with_desc.alt}</div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    }
    const insertInformation = (crawlItem: CrawlItem) => {
      const { newsId } = crawlItem;
      const selectedDom = document.querySelector(`[id=${newsId}]`)
      const renderedHTML = ReactDOMServer.renderToString(
        <InformationDom crawlItem={crawlItem} />
      );
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td colSpan="4">
          ${renderedHTML}
        </td>
      `;
      selectedDom?.insertAdjacentElement('afterend', tr)
    }
    const { newsId, url, title, press, updatedAt } = crawlItem;
    return (
      <tr id={newsId}
        style={index % 2 === 0 ? { backgroundColor: '#c0c0c0' } : { backgroundColor: '#e0e0e0' }}>
        <td className="col-xs-0">{index}</td>
        <td className="col-xs-4">
          <a onClick={() => window.open(url)}>{title}</a>
        </td>
        <td className="col-xs-1">{new Date(updatedAt).toLocaleString()}</td>
        <td>
          <a onClick={() => insertInformation(crawlItem)}>展開</a>
        </td>
      </tr>
    )
  }
  return (
    <table className="crawl-items-table">
      <thead>
        <tr>
          <th className="col-xs-0">#</th>
          <th className="col-xs-4">title</th>
          <th className="col-xs-4">updatedAt</th>
          <th className="col-xs-1">詳細資訊</th>
        </tr>
      </thead>
      <tbody>
        {crawlItems.map((crawlItem, index) => (
          <CrawlItemsTableElement key={crawlItem.newsId} crawlItem={crawlItem} index={index} />
        ))}
      </tbody>
    </table>
  )
}

function CrawlPannel({ getAllData, getAllDataLength, getAllUrls, getAllUrlsLength }: {
  getAllData: React.MouseEventHandler<HTMLAnchorElement>
  getAllDataLength: React.MouseEventHandler<HTMLAnchorElement>
  getAllUrls: React.MouseEventHandler<HTMLAnchorElement>
  getAllUrlsLength: React.MouseEventHandler<HTMLAnchorElement>
}) {
  return (
    <div className="template-base pannel">
      <div className="title">Crawl Pannel</div>
      <div className="template-content-base">
        <a onClick={getAllData}>查詢新聞內容</a>
        <a onClick={getAllUrls}>查詢新聞連結</a>
      </div>
    </div>
  )
}

function CrawlOverview({ crawlItemsLength }: { crawlItemsLength: number }) {
  const CrawlOverviewElement = ({ title, num }: { title: string; num: string; }) => {
    return (
      <div className="overview-element">
        <div className="title">{title}</div>
        <div className="num">{num}</div>
      </div>
    )
  }
  return (
    <div className="template-base overview">
      <div className="title">Crawl Overview</div>
      <div className="template-content-base">
        <CrawlOverviewElement title={"新聞數量"} num={`${crawlItemsLength}`} />
      </div>
    </div>
  )
}

export default function Crawler() {
  const [crawlItems, handleCrawlItems] = useState([]);
  const [crawlItemsLength, handleCrawlItemsLength] = useState(0);
  const [crawlUrls, handleCrawlUrls] = useState<CrawlUrl[]>([]);
  const [crawlUrlsLength, handleCrawlUrlsLength] = useState(0);
  const getAllData = async () => {
    let data = await fetchAllData();
    handleCrawlItems(data)
    let num = await fetchAllDataLength();
    handleCrawlItemsLength(num)

    handleCrawlUrls([])
    handleCrawlUrlsLength(0)
  }

  
  const getAllDataLength = async () => {
    let data = await fetchAllDataLength();
    handleCrawlItemsLength(data)
  }

  
  const getAllUrls = async () => {
    let data = await fetchAllUrls();
    console.log(data)
    const newData = data.map(tmp => (
      {
        ...tmp,
        postTime: new Date(tmp.postTime).toLocaleString(),
        createdAt: new Date(tmp.createdAt).toLocaleString(),
        updatedAt: new Date(tmp.updatedAt).toLocaleString()
      }
    ))
    handleCrawlUrls(newData)
    let num = await fetchAllUrlsLength();
    handleCrawlUrlsLength(num)

    handleCrawlItems([])
    handleCrawlItemsLength(0)
  }

  
  const getAllUrlsLength = async () => {
    let data = await fetchAllUrlsLength();
    handleCrawlUrlsLength(data)
  }

  const openNewsItemDetail = (param: Record<string, string | number | boolean>) => {
    let paramString = encodeURIComponent(JSON.stringify(param))
    window.open(`http://localhost:3000/crawler/newsItem/detail?param=${paramString}`)
  }

  const openNewsUrlDetail = (param: Record<string, string | number | boolean>) => {
    let paramString = encodeURIComponent(JSON.stringify(param))
    window.open(`http://localhost:3000/crawler/newsUrl/detail?param=${paramString}`)
  }
  return (
    <div>
      <div style={{ display: "flex", marginTop: '50px' }}>
        <CrawlPannel
          getAllData={getAllData}
          getAllDataLength={getAllDataLength}
          getAllUrls={getAllUrls}
          getAllUrlsLength={getAllUrlsLength}
        />
        <CrawlOverview crawlItemsLength={crawlItemsLength} />
      </div>
      {/* <div>
        <CrawlItemsTable crawlItems={crawlItems} />
      </div> */}
      <div>
        <BaseTable
          headerNames={['newsId', 'press', 'url', 'title']}
          items={crawlItems}
          colsWidth={[3, 2, 8, 6]}
          openDetail={openNewsItemDetail}
        />
      </div>
      <div>
        <BaseTable
          headerNames={['newsId', 'title', 'postTime', 'crawled']}
          items={crawlUrls}
          colsWidth={[3, 8, 6, 1]}
          openDetail={openNewsUrlDetail}
        />
      </div>
    </div>
  );
}
