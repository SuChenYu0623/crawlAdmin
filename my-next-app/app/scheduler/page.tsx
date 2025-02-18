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

const fetchCollectUrlsTask = async (payload: string) => await apiPostBase('/api/scheduler/collectUrlsTask', payload);
const fetchGetLoopUrlTaskPayload = async (size: number) => await apiGetBase(`/api/scheduler/getLoopUrlTaskPayload?size=${size}`);
const fetchLoopUrlTask = async (payload: string) => await apiPostBase(`/api/scheduler/loopUrlTask`, payload);
// const fetchLoopUrlTask = async (size: number) => await apiGetBase(`/api/scheduler/loopUrlTask?payload=${size}`);

export default function Scheduler() {
  // const testFunc = () => console.log('test Func')
  const collectUrlsTask = async (press: string) => {
    let payload = { workType: 'collectUrls', press: press }
    let data = await fetchCollectUrlsTask(JSON.stringify(payload));
    console.log(data)
  }

  const loopUrlsTask = async () => {
    let payload = await fetchGetLoopUrlTaskPayload(10)
    console.log('payload', payload)
    let data = await fetchLoopUrlTask(JSON.stringify(payload));
    // let data = await fetchLoopUrlTask(5);
    console.log(data)
  }
  return (
    <div>
      <div style={{ display: "flex", marginTop: '50px' }}>
        <div className="template-base pannel">
          <div className="title">Scheduler Pannel</div>
          <div className="template-content-base">
            <a onClick={loopUrlsTask}>loopUrl</a>
            <a onClick={() => collectUrlsTask('nytimes')}>nytimes collectUrls</a>
            <a onClick={() => collectUrlsTask('bbc')}>bbc collectUrls</a>
          </div>
        </div>
      </div>
      <div>
        {/* <CrawlItemsTable crawlItems={crawlItems} /> */}
      </div>
    </div>
  );
}
