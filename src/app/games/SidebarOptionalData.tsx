import Link from "next/link";
import styles from "./sidebar.module.scss";

export function Optional() {}

type OptionalData = {
  data: string;
  placeholder?: React.ReactNode;
};

function BuildLink({ data, placeholder }: OptionalData) {
  if (data === "---" || data === "") return placeholder;

  return (
    <Link href={data} target="_blank" className={styles.playButtonLink} title="Play Game!">
      <svg xmlns="http://www.w3.org/2000/svg" width="53" height="53" fill="none" viewBox="0 0 53 53">
        <path
          fill="#D9D9D9"
          d="M39 25.268c1.333.77 1.333 2.694 0 3.464L21 39.124c-1.333.77-3-.192-3-1.732V16.608c0-1.54 1.667-2.502 3-1.732l18 10.392z"
        ></path>
      </svg>
      Link to Game
    </Link>
  );
}
Optional.Link = BuildLink;

function Date({ data }: OptionalData) {
  if (data === "---" || data === "") return;
  return (
    <p className="text-md mt-2 w-[calc(100%-90px)] font-header tracking-wide opacity-70 lg:text-[1.2rem]">{data}</p>
  );
}
Optional.Date = Date;

function Description({ data }: OptionalData) {
  if (data === "---" || data === "") return;
  return <p className="opacity-60 whitespace-pre-line mb-4" dangerouslySetInnerHTML={{ __html: data }}></p>;
}
Optional.Description = Description;

function Credits({ data }: OptionalData) {
  if (data === "---" || data === "") return;
  return (
    <>
      <h3 className="font-header tracking-[1px]">Credits</h3>
      <p className="opacity-60 whitespace-pre-line mb-4" dangerouslySetInnerHTML={{ __html: data }}></p>
    </>
  );
}
Optional.Credits = Credits;



function Theme({ data }: OptionalData) {
  if (data === "---" || data === "") return;
  return (
    <>
      <h3 className="font-header tracking-[1px]">Theme</h3>
      <p className="opacity-60 whitespace-pre-line mb-4">{data}</p>
    </>
  );
}
Optional.Theme = Theme;
