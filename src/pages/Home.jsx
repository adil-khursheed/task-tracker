// import { useSelector } from "react-redux";
import TodoInput from "../components/TodoInput";
import Task from "../components/Task";
import { useState } from "react";
import {
  useDeleteCompletedTaskMutation,
  useGetActiveTasksQuery,
  useGetCompletedTasksQuery,
  useGetTasksQuery,
} from "../slices/tasksApiSlice";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const Home = () => {
  const { data: allTasks, isLoading: allTasksLoading } = useGetTasksQuery();

  const { data: allActiveTasks, isLoading: activeTasksLoading } =
    useGetActiveTasksQuery();

  const { data: allCompletedTasks, isLoading: completedTasksLoading } =
    useGetCompletedTasksQuery();

  const tabs = [
    {
      id: "tab1",
      label: "All",
      content: (
        <>
          {allTasksLoading ? (
            <Loader />
          ) : (
            <>
              <div>
                {allTasks && allTasks.tasks.length <= 0 ? (
                  <p className="flex justify-center items-center py-6 text-Dark-Grayish-Blue text-lg">
                    No Tasks Yet
                  </p>
                ) : (
                  allTasks &&
                  allTasks.tasks.map((task, index) => (
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
    {
      id: "tab2",
      label: "Active",
      content: (
        <>
          {activeTasksLoading ? (
            <Loader />
          ) : (
            <>
              <div>
                {allActiveTasks && allActiveTasks.activeTasks.length <= 0 ? (
                  <p className="flex justify-center items-center py-6 text-Dark-Grayish-Blue text-lg">
                    No Active Tasks
                  </p>
                ) : (
                  allActiveTasks &&
                  allActiveTasks.activeTasks.map((task, index) => (
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
    {
      id: "tab3",
      label: "Completed",
      content: (
        <>
          {completedTasksLoading ? (
            <Loader />
          ) : (
            <>
              <div>
                {allCompletedTasks &&
                allCompletedTasks.completedTasks.length <= 0 ? (
                  <p className="flex justify-center items-center py-6 text-Dark-Grayish-Blue text-lg">
                    No Completed Tasks
                  </p>
                ) : (
                  allCompletedTasks &&
                  allCompletedTasks.completedTasks.map((task, index) => (
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
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const activeTabContent = tabs.find((tab) => tab.id === activeTab).content;

  const [deleteCompletedTask, { data }] = useDeleteCompletedTaskMutation();

  const clearCompletedHandler = async () => {
    try {
      await deleteCompletedTask().unwrap();
      toast.success(data?.message);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <TodoInput />

      <div className="bg-Very-Light-Gray dark:bg-Very-Dark-Grayish-Blue shadow-md shadow-Light-Grayish-Blue dark:shadow-Very-Dark-Desaturated-Blue rounded-[4px]">
        <div>{activeTabContent}</div>

        <div className="relative flex justify-between items-center px-4 h-[45px]">
          <p className="text-sm text-Dark-Grayish-Blue">
            {allActiveTasks?.activeTasks.length} items left
          </p>
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
