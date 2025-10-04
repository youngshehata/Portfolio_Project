import { useEffect, useState } from "react";
import { PersonalApi } from "../../api/personalApi";
import styles from "./Home.module.css";
import HomeButtons from "./HomeButtons/HomeButtons";
import HomeContact from "./HomeContact/HomeContact";
import Stack from "./Stack/Stack";
import SideButtons from "./SideButtons/SideButtons";
import PersonalCard from "./PersonalCard/PersonalCard";
import { lorem50 } from "../../common/templates/lorem50";
import { skeletonStack } from "../../common/templates/skeleton-stack";

export default function Home() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    PersonalApi.homepage().then((res) => {
      setData(res.data.data);
    });
  }, []);
  return (
    <div className={`${styles.container}`}>
      <PersonalCard
        image={data?.personal?.image || "...."} // DEFAULT IMAGE URL
        name={data?.personal?.name || "Fetching Name..."}
        title={data?.personal?.title || "Fetching Title..."}
        about={data?.personal?.about || lorem50}
      />
      <HomeButtons developerName={data?.personal?.name || "Develeoper"} />
      <HomeContact list={data?.contacts || []} />
      <Stack list={data?.skills || skeletonStack(20)} />
      <SideButtons />
    </div>
  );
}
