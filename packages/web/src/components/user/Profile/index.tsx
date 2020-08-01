import React from "react";
import { Container } from "@material-ui/core";
import { RouteComponentProps } from "react-router-dom";
import ProfileCard from "./ProfileCard";
import EditInfo from "./EditInfo";

const Profile: React.FC<RouteComponentProps<{ field: string }>> = ({
  match: { params },
}) => {
  const showCollapse =
    window.location.pathname.replace("/dashboard/profile/", "") === "home";

  const { field } = params;

  const matchToComponent = () => {
    switch (field) {
      case "info":
        return <EditInfo />;
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="xl">
      <ProfileCard showCollapse={showCollapse} />
      {matchToComponent()}
    </Container>
  );
};

export default Profile;
