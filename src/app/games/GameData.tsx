export type GameData = {
  title: string;
  thumbnail: string;
  buildLink: string;
  description: string;
  credits: string;
  uploadDate: string;
  date: string;
  theme: string;
  media1: string;
  media2: string;
  media3: string;
};

export default async function GetGameData() {
  const spreadsheet_id = process.env.SPREADSHEET_ID;
  const tab_name = "Sheet1";
  const api_key = process.env.SPREADSHEET_KEY;
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheet_id}/values/${tab_name}?alt=json&key=${api_key}`;

  const games: GameData[] = [];
  try {
    const res = await fetch(url);
    const result = await res.json();
    for (let i = 1; i < result.values[1].length; i++) {
      const r = result.values;
      if (r[1][i] === "") continue;
      const game: GameData = {
        title: r[1][i],
        thumbnail: r[9][i],
        buildLink: r[3][i],
        description: r[4][i],
        credits: r[5][i],
        uploadDate: r[6][i],
        date: r[7][i],
        theme: r[8][i],
        media1: r[10][i],
        media2: r[11][i],
        media3: r[12][i],
      };
      games.push(game);
    }
    games.reverse();
    return games;

  } catch (error) {
    console.error(error);
    return null
  }
}
