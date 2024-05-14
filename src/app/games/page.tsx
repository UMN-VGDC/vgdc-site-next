import Triangles from "../_icons/Triangles";
import GetGameData, { GameData } from "./GameData";
import GamesSelect from "./GamesSelect";
import NewTag from "./NewTag";
import Panel from "./Panel";
import styles from "./styles.module.scss";

export default async function Games() {
  const gameData = await GetGameData();
  return (
    <main className="flex gap-[30px]">
      <Triangles className="pointer-events-none fixed bottom-0 right-0 w-[80vw] opacity-40 mix-blend-screen" />
      <GamesSelect>
        {gameData?.map((e, i) => {
          return <GamePanel data={e} index={i} key={i} />;
        })}
      </GamesSelect>
    </main>
  );
}

interface GamePanel {
  data: GameData;
  index: number;
}

function GamePanel({ data, index }: GamePanel) {
  return (
    <Panel index={index} data={data}>
      <div className="relative h-[calc(100%-5rem)] overflow-hidden rounded-[0.6rem] border-2 border-bgTertiary">
        <img className={styles.thumbnailImage} src={data.thumbnail} alt={data.title}></img>
      </div>
      <NewTag date={data.uploadDate} />
      <figcaption className={`${styles.title} font-header`}>{data.title}</figcaption>
    </Panel>
  );
}
