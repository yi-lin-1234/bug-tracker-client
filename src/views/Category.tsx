import { useState, useEffect } from "react";
import Table from "../components/Table";

import { groupBugs } from "../util/helper";
import { getAllBugs } from "../apiService";
import { GroupedDataObj, Bug } from "../type";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function Category() {
  const [bugs, setBugs] = useState<Bug[]>([]);
  const [groupedData, setGroupedData] = useState<GroupedDataObj[]>([]);
  const [currentTab, setCurrentTab] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  const navigation = groupedData.map((item) => ({
    name: item.category,
    count: item.count,
    current: currentTab === item.category,
  }));

  const filteredBugs = bugs.filter((bug) => bug.category === currentTab);

  useEffect(() => {
    async function initialSetUp() {
      setIsLoading(true);
      try {
        const data = await getAllBugs();
        setBugs(data);
        setGroupedData(groupBugs(data));
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    initialSetUp();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex min-h-full flex-col m-10">
      <div className="mx-auto flex w-full max-w-7xl items-start gap-x-8 px-4 sm:px-6 lg:px-8">
        <aside className="sticky top-8 hidden w-44 shrink-0 lg:block">
          <nav className="flex flex-1 flex-col py-8" aria-label="Sidebar">
            <ul className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name} onClick={() => setCurrentTab(item.name)}>
                  <div
                    className={classNames(
                      item.current
                        ? "bg-gray-50 text-blue-600"
                        : "text-gray-700 hover:text-blue-600 hover:bg-gray-50",
                      "group flex gap-x-3 rounded-md p-2 pl-3 text-sm leading-6 font-semibold"
                    )}
                  >
                    {item.name}

                    <span
                      className="ml-auto w-9 min-w-max whitespace-nowrap rounded-full bg-white px-2.5 py-0.5 text-center text-xs font-medium leading-5 text-gray-600 ring-1 ring-inset ring-gray-200"
                      aria-hidden="true"
                    >
                      {item.count}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <main className="flex-1">
          <Table bugs={filteredBugs} />
        </main>
      </div>
    </div>
  );
}

export default Category;
