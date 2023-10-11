import { useAppSelector } from "@/hooks/useRedux";
import VerseItem from "@/components/VerseItem";

const Admin = () => {
  const bookmarked = useAppSelector((state) => state.quran.bookmarked);

  const groupedBookmarks: any = [];

  bookmarked.forEach((item) => {
    const ip = item.ip;
    // Check if an object with this IP already exists
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

  // groupedBookmarks now contains an array of objects, each with groupedIP and items

  //   const groupedBookmarksArray = groupedBookmarks;

  console.log(groupedBookmarks);
  //   console.log(bookmarked)

  if (bookmarked.length === 0) {
    return (
      <p className="py-[7rem] md:py-[3rem] text-center px3">
        No bookmarked verse available. Please add a verse to bookmark.
      </p>
    );
  }

  return (
    <div className="grid gap-5 p-[2rem] md:p-[3rem] mx-auto">
      <div className="grid">
        {groupedBookmarks?.map(({ groupedIP, items }: any) => (
          <div key={groupedIP}>
            <h1>IP: {groupedIP}</h1>
            <div>
              {items?.map(({ verse, chapter, id }: any, i: number) => (
                <VerseItem
                  key={i}
                  verse={verse}
                  number={id}
                  chapterId={chapter}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
