/* eslint-disable operator-linebreak */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncReceiveLeaderboard } from "../states/leaderboards/action";

export default function LeaderboardsPage() {
  const { authUser = null, leaderboards = [] } = useSelector((states) => states);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveLeaderboard());
  }, [dispatch]);

  return (
    <div className="board-page">
      <h2>Klasmen Pengguna Aktif</h2>
      <div className="leaderboards-list">
        <header>
          <p className="leaderboards-list__user-label">Pengguna</p>
          <p className="leaderboards-list__score-label">Skor</p>
        </header>
        {!!leaderboards &&
          leaderboards.map((item) => (
            <div className="leaderboard-item" key={item.user.id}>
              <div className="leaderboard-item__user-info">
                <img src={item.user.avatar} alt={item.user.name} />
                <p>
                  {item.user.name}{" "}
                  <em>{authUser !== null && authUser.id === item.user.id ? "(Anda)" : ""}</em>
                </p>
              </div>
              <p className="leaderboard-item__score">{item.score}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
