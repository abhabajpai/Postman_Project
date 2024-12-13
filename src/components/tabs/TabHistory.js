import React, { useContext } from "react";
import { HistoryContext } from "../../contexts/History";
import styles from "./tab.module.css";
import image from "../../images/no-history.png";

function doDatewiseGroup(dataArr) {
  const dates = [];
  dataArr.filter(Boolean).forEach((el) => {
    const d = new Date(+el.split(" : ")[0]);
    dates.push(`${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`);
  });
  const groupedDates = dates.filter((v, i, a) => a.indexOf(v) === i);
  const reqArr = [];
  groupedDates.forEach((el) => {
    const requests = dataArr.filter(Boolean).filter((item) => {
      const d = new Date(+item.split(" : ")[0]);
      const reqDate = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
      return reqDate === el;
    });
    reqArr.push({
      date: new Date(el).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      requests,
    });
  });
  return reqArr;
}

const UrlList = ({ items }) => {
  const listItems = doDatewiseGroup(items);

  return (
    <div className={styles.history}>
      <div className="flex-grow overflow-y-auto bg-gray-100">
        {listItems.map((group, i) => (
          <div className="mb-2" key={`req-history-group-${i}`}>
            <details open>
              <summary className="text-gray-800 px-2 text-xs">
                {group.date}
              </summary>
              <div className="overflow-hidden">
                <ul className="py-1">
                  {group.requests.map((req, j) => {
                    const item = req.split(" : ")[1];
                    return (
                      <li
                        key={`req-history-item-${i}-${j}`}
                        className="text-gray-700 px-2 py-2 cursor-pointer items-center text-xs hover:bg-gray-200 relative group"
                        title={item.split(" ")[1]}
                      >
                        <span className="mr-2 text-xs text-right">
                          {item.split(" ")[0] === "DELETE"
                            ? "DEL"
                            : item.split(" ")[0]}
                        </span>
                        <span>{item.split(" ")[1]}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </details>
          </div>
        ))}
      </div>
    </div>
  );
};

const TabHistory = () => {
  const { apis = [] } = useContext(HistoryContext);

  return (
    <div className="flex flex-col h-full">
      {apis.length === 0 ? (
        <div className={styles.empty_tab}>
          <img src={image} alt="" />
          <h4>You haven't sent any requests.</h4>
          <p>Any request you send in this workspace will appear here.</p>
        </div>
      ) : (
        <UrlList items={apis} />
      )}
    </div>
  );
};

export default TabHistory;
