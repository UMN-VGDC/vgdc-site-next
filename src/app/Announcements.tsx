import React, { useEffect, useState, useRef } from "react";
import { useMediaQuery } from "../../hooks/useMediaQuery";

export default function Announcements() {
  const mediaQueryAnn = useMediaQuery("announcement");
  const mediaQueryMd = useMediaQuery("md");

  let expanded = false;
  const listContainer = useRef();
  const handleExpand = (e) => {
    expanded = !expanded;
    const panel = e.target.closest(".announcements");
    if (expanded) {
      panel.classList.add("announcements-expanded");
      panel.classList.remove("announcements-collapsed");
      listContainer.current.classList.add("announcement-list-expanded");
      e.target.innerText = "Collapse";
      if (mediaQueryAnn) return
      panel.scrollIntoView();
    } else {
      panel.classList.add("announcements-collapsed");
      panel.classList.remove("announcements-expanded");
      listContainer.current.classList.remove("announcement-list-expanded");
      listContainer.current.scrollTo(0, 0);
      e.target.innerText = "Read More";
    }
  };

  let [announcement, setAnnouncement] = useState();
  useEffect(() => {
    const spreadsheet_id = "1TavkbXHhw3hrDaRKhhNsevyRCM_UG8VD0x-d5eZnHZE";
    const tab_name = "Announcements";
    const api_key = import.meta.env.VITE_GOOGLE_SHEETS_API;
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheet_id}/values/${tab_name}?alt=json&key=${api_key}`;
    const FetchData = async () => {
      const res = await fetch(url);
      const result = await res.json();
      setAnnouncement(result.values);
    };
    FetchData().catch(console.error);
  }, []);

  let [announcementList, setAnnouncementList] = useState();
  useEffect(() => {
    const announcementsArr = announcement
      ?.slice(1)
      .reverse()
      .map((e, index) => {
        return (
          <div className="content" key={index}>
            <div className="post-header">
              <div className="author">{e[1]}</div>
              <div className="date">{e[2]}</div>
            </div>
            <p>{e[0]}</p>
            <div className="divider"></div>
          </div>
        );
      });
    setAnnouncementList(announcementsArr);
  }, [announcement]);

  const handlExpandButton = () => {
    if (mediaQueryMd && !mediaQueryAnn) {
        listContainer.current.classList.remove("announcement-list-expanded");
        document.querySelector(".announcements").classList.remove("announcements-expanded");
        document.querySelector(".announcements").classList.add("announcements-collapsed");
        return
    };
    listContainer?.current?.scrollTo(0, 0);
    return (
      <div className="read-more noselect" onClick={handleExpand}>
        <svg
          width="34"
          height="38"
          viewBox="0 0 34 38"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M32 15.5359C34.6667 17.0755 34.6667 20.9245 32 22.4641L6.5 37.1865C3.83333 38.7261 0.499998 36.8016 0.499998 33.7224L0.5 4.27757C0.5 1.19837 3.83333 -0.726135 6.5 0.813465L32 15.5359Z"
            fill="white"
          />
        </svg>
        <div style={{ display: "inline" }}>Read More</div>
      </div>
    );
  };

  return (
    <aside className="announcements announcements-collapsed">
      <div className="header">
        <h2>Recent Announcements</h2>
        {handlExpandButton()}
      </div>
      <div className="announcement-list-collapsed" ref={listContainer}>
        {announcementList}
      </div>
    </aside>
  );
}
