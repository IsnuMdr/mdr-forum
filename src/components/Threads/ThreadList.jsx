import PropTypes from "prop-types";
import ThreadItem from "./ThreadItem";

export default function ThreadList({ threadList }) {
  return (
    <div className="threads-list">
      {threadList ? (
        <>
          {threadList.map((item) => (
            <ThreadItem key={item.id} {...item} />
          ))}
        </>
      ) : (
        <>no threads</>
      )}
    </div>
  );
}

ThreadList.propTypes = {
  threadList: PropTypes.arrayOf(PropTypes.object).isRequired,
};
