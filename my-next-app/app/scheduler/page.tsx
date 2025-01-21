"use client";
import React, { useState } from "react";

const apiGetBase = async (url: string) => {
  return await fetch(url, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'GET',
  })
    .then(res => res.json())
}

const apiPostBase = async (url: string, payload: string) => {
  return await fetch(url, {
    headers: {
      'Content-Type': 'application/json'
    },
    body: payload,
    method: 'POST',
  })
    .then(res => res.json())
}

const fetchCollectUrlsTask = async () => await apiPostBase('/api/scheduler/collectUrlsTask', '{}');
const fetchGetLoopUrlTaskPayload = async (size: number) => await apiGetBase(`/api/scheduler/getLoopUrlTaskPayload?size=${size}`);
const fetchLoopUrlTask = async (payload: string) => await apiPostBase(`/api/scheduler/loopUrlTask`, payload);
// const fetchLoopUrlTask = async (size: number) => await apiGetBase(`/api/scheduler/loopUrlTask?payload=${size}`);

function SchedulerPannel({ loopUrlsTaskFunc, collectUrlsTaskFunc }: {
  loopUrlsTaskFunc: React.MouseEventHandler<HTMLAnchorElement>,
  collectUrlsTaskFunc: React.MouseEventHandler<HTMLAnchorElement>
}) {
  return (
    <div className="template-base pannel">
      <div className="title">Scheduler Pannel</div>
      <div className="template-content-base">
        <a onClick={loopUrlsTaskFunc}>loopUrl</a>
        <a onClick={collectUrlsTaskFunc}>collect cats</a>
      </div>
    </div>
  )
}

export default function Scheduler() {
  // const testFunc = () => console.log('test Func')
  const collectUrlsTask = async () => {
    let data = await fetchCollectUrlsTask();
    console.log(data)
  }

  const loopUrlsTask = async () => {
    let payload = await fetchGetLoopUrlTaskPayload(5)
    console.log('payload', payload)
    let data = await fetchLoopUrlTask(JSON.stringify(payload));
    // let data = await fetchLoopUrlTask(5);
    console.log(data)
  }
  return (
    <div>
      <div style={{ display: "flex", marginTop: '50px' }}>
        <SchedulerPannel collectUrlsTaskFunc={collectUrlsTask} loopUrlsTaskFunc={loopUrlsTask} />
        {/* <CrawlOverview crawlItemsLength={crawlItemsLength} /> */}
      </div>
      <div>
        {/* <CrawlItemsTable crawlItems={crawlItems} /> */}
      </div>
    </div>
  );
}
