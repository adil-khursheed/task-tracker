// import { useSelector } from "react-redux";
import TodoInput from "../components/TodoInput";
import Task from "../components/Task";
import { useState } from "react";
import { useGetTasksQuery } from "../slices/tasksApiSlice";
import Loader from "../components/Loader";

const Home = () => {
  // const { userInfo } = useSelector((state) => state.auth);

  const { data, isLoading } = useGetTasksQuery();
  console.log(data);

  const tabs = [
    {
      id: "tab1",
      label: "All",
      content: (
        <>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <div>
                {data && data.length <= 0 ? (
                  <p className="flex justify-center items-center py-6 text-Dark-Grayish-Blue text-lg">
                    No Tasks Yet
                  </p>
                ) : (
                  data &&
                  data.map((task, index) => (
                    <Task
                      key={task._id}
                      title={task.title}
                      status={task.completed}
                      taskId={task._id}
                      index={index}
                    />
                  ))
                )}
              </div>
            </>
          )}
        </>
      ),
    },
    // {
    //   id: "tab2",
    //   label: "Active",
    //   content: (
    //     <div>
    //       {userInfo && userInfo.user.activeTasks.length <= 0 ? (
    //         <p className="flex justify-center items-center py-6 text-Dark-Grayish-Blue text-lg">
    //           No Active Tasks
    //         </p>
    //       ) : (
    //         userInfo &&
    //         userInfo.user.activeTasks.map((task, index) => (
    //           <Task
    //             key={task._id}
    //             title={task.title}
    //             status={task.completed}
    //             taskId={task._id}
    //             index={index}
    //           />
    //         ))
    //       )}
    //     </div>
    //   ),
    // },
    // {
    //   id: "tab3",
    //   label: "Completed",
    //   content: (
    //     <div>
    //       {userInfo && userInfo.user.completedTasks.length <= 0 ? (
    //         <p className="flex justify-center items-center py-6 text-Dark-Grayish-Blue text-lg">
    //           No Completed Tasks
    //         </p>
    //       ) : (
    //         userInfo &&
    //         userInfo.user.completedTasks.map((task, index) => (
    //           <Task
    //             key={task._id}
    //             title={task.title}
    //             status={task.completed}
    //             taskId={task._id}
    //             index={index}
    //           />
    //         ))
    //       )}
    //     </div>
    //   ),
    // },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const activeTabContent = tabs.find((tab) => tab.id === activeTab).content;

  const clearCompletedHandler = async () => {};

  return (
    <>
      <TodoInput />

      <div className="bg-Very-Light-Gray dark:bg-Very-Dark-Grayish-Blue shadow-md shadow-Light-Grayish-Blue dark:shadow-Very-Dark-Desaturated-Blue rounded-[4px]">
        <div>{activeTabContent}</div>

        <div className="relative flex justify-between items-center px-4 h-[45px]">
          <p className="text-sm text-Dark-Grayish-Blue">0 items left</p>
          <div className="absolute sm:relative w-full sm:w-0 -bottom-20 sm:bottom-0 rounded-[4px] left-0 text-sm text-Dark-Grayish-Blue font-bold flex justify-center gap-4 bg-Very-Light-Gray dark:bg-Very-Dark-Grayish-Blue sm:bg-transparent sm:dark:bg-transparent h-[60px] shadow-sm sm:shadow-none shadow-Light-Grayish-Blue dark:shadow-Very-Dark-Desaturated-Blue text-md">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={activeTab === tab.id ? "active" : ""}
                onClick={() => handleTabClick(tab.id)}>
                {tab.label}
              </button>
            ))}
          </div>
          <button
            onClick={clearCompletedHandler}
            className="text-sm text-Dark-Grayish-Blue hover:font-semibold">
            Clear Completed
          </button>
        </div>
      </div>

      <div className="text-center text-[13px] my-32 sm:my-10 text-Dark-Grayish-Blue">
        <p>Drag and drop to reorder list</p>
      </div>
    </>
  );
};

export default Home;
