const TabList = ({ isShowCompleted, displayCompleted }) => {
  return (
    <div className="nav nav-tabs">
      <span
        onClick={() => displayCompleted(true)}
        className={isShowCompleted ? "nav-link active" : "nav-link"}
      >
        Complete
      </span>
      <span
        onClick={() => displayCompleted(false)}
        className={isShowCompleted ? "nav-link" : "nav-link active"}
      >
        Incomplete
      </span>
    </div>
  );
};

export default TabList;
