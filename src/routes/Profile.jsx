import React from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import Logout from "./Logout";

export default function Profile() {
  const { username } = useParams();
  return (
    <div>
      <h1>{username}</h1>
      <Link to={`/profile/${username}/favorites`}>
        <button type="submit">Favorites</button>
      </Link>
      <Link to={`/profile/${username}/podcasts`}>
        <button type="submit">Podcasts</button>
      </Link>
      <Outlet />
      <Logout username={username} />
    </div>
  );
}
