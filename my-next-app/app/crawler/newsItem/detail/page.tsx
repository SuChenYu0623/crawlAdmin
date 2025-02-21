'use client';
import { useSearchParams } from "next/navigation";

interface NewsItem {
  newsId: string;
  press: string;
  title: string;
  url: string;
  summary: string;
  updatedAt: string;
}

function OverviewElement({ title, value }: { title: string; value: string; }) {
  return (
    <div className="overview-element">
      <div className="title">{title}</div>
      <div>{value}</div>
    </div>
  )
}

function NewsItemInfoOverview({ newsItem }: { newsItem: NewsItem }) {
  const { newsId, press, title, url, updatedAt } = newsItem
  return (
    <div className="template-base overview">
      <div className="title">{'NewsItem Info'}</div>
      <div className="template-content-base">
        <OverviewElement title={"newsId"} value={`${newsId}`} />
        <OverviewElement title={"出版社"} value={`${press}`} />
        <OverviewElement title={"標題"} value={`${title}`} />
        <OverviewElement title={"連結"} value={`${url}`} />
        <OverviewElement title={"更新日期"} value={`${updatedAt}`} />
      </div>
    </div>
  )
}

function NewsItemSummaryOverview({ newsItem }: { newsItem: NewsItem }) {
  const { summary } = newsItem
  return (
    <div className="template-base overview" style={{ marginLeft: '10px' }}>
      <div className="title">{'摘要'}</div>
      <div className="template-content-base">
        <OverviewElement title={"summary"} value={`${summary}`} />
      </div>
    </div>
  )
}

export default function DetailNewsItem() {
  const searchParams = useSearchParams()
  const jsonString = searchParams?.get('param') || '{}'
  const newsItem = JSON.parse(decodeURIComponent(jsonString))
  const { newsId, press, title, url, summary, images_with_desc, updatedAt } = newsItem
  return (
    <div>
      <div style={{ display: 'flex' }}>
        <NewsItemInfoOverview newsItem={newsItem} />
        <NewsItemSummaryOverview newsItem={newsItem} />
      </div>
      <div style={{ marginTop: '20px' }}>
        {images_with_desc.map((image_with_desc: { src: string; alt: string; desc: string; }, idx: number) => {
          const { src, alt, desc } = image_with_desc;
          return (
            <div key={idx} className="template-base overview" style={{ width: '90%', display: 'flex' }}>
              <img style={{width: '40%'}} src={src} />
              <div style={{ marginLeft: '10px' }}>
                <div>
                  <div className="title">description</div>
                  <div>{desc}</div>
                </div>
                <div>
                  <div className="title">alt</div>
                  <div>{alt}</div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

    </div>
  )
}