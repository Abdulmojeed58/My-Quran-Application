import { useAppSelector } from "@/hooks/useRedux";
import VerseItem from "@/components/VerseItem";
import PrivateRoute from "@/components/PrivateRoute";
import { useEffect, useState } from "react";
import { getCurrentIp } from "@/utils/getCurrentIpAddress";

const Admin = () => {
  const bookmarked = useAppSelector((state) => state.quran.bookmarked);
  const configuredIp = useAppSelector((state) => state.ipAddress.ipLists);

  const [currentIp, setCurrentIp] = useState<string | null>(null);

  useEffect(() => {
    const handleIpAddress = async () => {
      setCurrentIp(await getCurrentIp());
    };
    handleIpAddress();
  }, []);

  if (!currentIp) return <p>loading...</p>;

  const groupedBookmarks: any = [];

  bookmarked.forEach((item) => {
    const ip = item.ip;
    const existingGroup = groupedBookmarks.find(
      (group: any) => group.groupedIP === ip
    );

    if (existingGroup) {
      // If a group with this IP exists, push the item to its items array
      existingGroup.items.push(item);
    } else {
      // If no group with this IP exists, create a new group object
      groupedBookmarks.push({
        groupedIP: ip,
        items: [item],
      });
    }
  });

  if (bookmarked.length === 0) {
    return (
      <PrivateRoute configuredIp={configuredIp} currentIp={currentIp}>
        <p className="py-[7rem] md:py-[3rem] text-center px3">
          No bookmarked verse available. Please add a verse to bookmark.
        </p>
      </PrivateRoute>
    );
  }

  return (
    <PrivateRoute configuredIp={configuredIp} currentIp={currentIp}>
      <div className="grid gap-5 p-[2rem] pt-[5rem] md:p-[3rem] mx-auto">
        <div className="grid gap-[3rem]">
          {groupedBookmarks?.map(({ groupedIP, items }: any) => (
            <div key={groupedIP}>
              <h1 className="font-bold text-[1.2rem]">
                IP: {groupedIP},{" "}
                <span className="font-normal">
                  ({items.length}) {items.length === 1 ? "verse" : "verses"}{" "}
                  bookmarked
                </span>
              </h1>
              <div>
                {items?.map(({ verse, chapter, id }: any, i: number) => (
                  <VerseItem
                    key={i}
                    verse={verse}
                    number={id}
                    chapterId={chapter}
                    handleBookmark={false}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PrivateRoute>
  );
};

export default Admin;
