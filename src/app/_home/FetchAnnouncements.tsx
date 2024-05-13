export default async function FetchAnnouncements() {
  const spreadsheet_id = process.env.SPREADSHEET_ID;
  const tab_name = "Announcements";
  const api_key = process.env.SPREADSHEET_KEY;
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheet_id}/values/${tab_name}?alt=json&key=${api_key}`;

  try {
    const res = await fetch(url);
    const result = await res.json();
    const { values } = result;
    return values
      ?.slice(1)
      .reverse()
      .map((e: string[], i: number) => {
        return <Item name={e[1]} date={e[2]} text={e[0]} key={i} />;
      });
  } catch (err) {
    console.error(err);
    return <div className="p-5">An error occurred when fetching announcements</div>;
  }
}

type AnnouncementItem = {
  name: string;
  date: string;
  text: string;
};

function Item({ name, date, text }: AnnouncementItem) {
  return (
    <div className="px-5">
      <div className="mt-[0.8rem]">
        <div className="mr-4 inline text-[#5f76f8]">{name}</div>
        <div className="mr-4 inline text-[0.7rem] font-bold tracking-[0.07rem] text-[#525252]">{date}</div>
      </div>
      <p className="mt-[0.4rem] whitespace-pre-line text-[0.9rem] font-light leading-[1.5rem] text-[#a7a7a7]">{text}</p>
      <div className="divider"></div>
    </div>
  );
}
