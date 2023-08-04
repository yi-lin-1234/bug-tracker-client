import { useState, useEffect } from "react";
import { getAllBugs } from "../apiService";
import Table from "../components/Table";

function All() {
  const [bugs, setBugs] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function initialSetUp() {
      setIsLoading(true);
      try {
        const data = await getAllBugs();
        setBugs(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    initialSetUp();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return <Table bugs={bugs} />;
}

export default All;
