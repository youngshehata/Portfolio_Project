import styles from "./Settings-Messages.module.css";
import SearchableList from "../../../layouts/SearchableList/SearchableList";
import MessageRow from "./MessageRow/MessageRow";
import { useMessages } from "./hook/useMessages";
import { TMessage } from "../../../common/types/message.type";
import { useEffect, useState } from "react";

export default function SettingsMessages() {
  const {
    data,
    totalResults,
    currentPage,
    nextPage,
    prevPage,
    firstPage,
    lastPage,
    search,
    markAsRead,
  } = useMessages();

  const [newMessage, setNewMessage] = useState(0);

  const headers = [
    { label: "New Messages:", value: newMessage.toString() },
    { label: "Total Messages:", value: totalResults.toString() },
  ];

  const tableColumns = [{ name: "Message", widthPercentage: 100 }];

  // wrappers to keep same behavior (close dialogs after action)

  const handleMarkAsRead = async (id: number) => {
    await markAsRead(id);
  };

  useEffect(() => {
    setNewMessage(data.filter((item) => item.isRead === false).length);
  }, [data]);

  return (
    <div className={styles.container}>
      <SearchableList<TMessage>
        categoryName="message"
        headersList={headers}
        tableColumns={tableColumns}
        data={data}
        renderRow={(item, i) => (
          <MessageRow
            key={item.id}
            index={i + 1}
            message={item}
            markAsRead={() => {
              if (item.isRead === true) {
                return;
              }
              handleMarkAsRead(item.id);
            }}
          />
        )}
        searchFunction={search}
        dialogComponent={<></>}
        dialogOpen={false}
        onDialogOpenChange={() => {}}
        handleClickFirstPage={firstPage}
        handleClickLastPage={lastPage}
        handleClickNext={nextPage}
        handleClickPrevious={prevPage}
        currentPage={currentPage}
        listLength={totalResults}
      />
    </div>
  );
}
