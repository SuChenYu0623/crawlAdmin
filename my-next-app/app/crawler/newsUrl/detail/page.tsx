'use client';
import { useSearchParams } from "next/navigation";

interface NewsUrl {
  newsId: string;
  title: string;
  url: string;
  postTime: string;
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

function NewsUrlInfoOverview({ newsUrl }: { newsUrl: NewsUrl }) {
  const { newsId, title, url, postTime, updatedAt } = newsUrl
  return (
    <div className="template-base overview">
      <div className="title">{'NewsItem Info'}</div>
      <div className="template-content-base">
        <OverviewElement title={"newsId"} value={`${newsId}`} />
        <OverviewElement title={"標題"} value={`${title}`} />
        <OverviewElement title={"連結"} value={`${url}`} />
        <OverviewElement title={"發布日期"} value={`${postTime}`} />
        <OverviewElement title={"更新日期"} value={`${updatedAt}`} />
      </div>
    </div>
  )
}


export default function DetailNewsUrl() {
  const searchParams = useSearchParams()
  const jsonString = searchParams?.get('param') || '{}'
  const newsUrl = JSON.parse(decodeURIComponent(jsonString))
  const { newsId, title, url, images_with_desc, updatedAt } = newsUrl
  return (
    <div>
      <div style={{ display: 'flex' }}>
        <NewsUrlInfoOverview newsUrl={newsUrl} />
      </div>
    </div>
  )
}