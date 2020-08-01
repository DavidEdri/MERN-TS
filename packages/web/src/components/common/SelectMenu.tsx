import React from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";

type Props = {
  buttonText: string | JSX.Element;
  links: { text: string; to: string | VoidFunction }[];
};

const SelectMenu: React.FC<Props> = ({ buttonText, links }) => {
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigateTo = (url: string) => {
    history.push(url);
  };

  return (
    <>
      {typeof buttonText === "object" ? (
        <IconButton
          color="inherit"
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          {buttonText}
        </IconButton>
      ) : (
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
          color="inherit"
        >
          {buttonText}
        </Button>
      )}

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {links.map((link, i) => (
          <MenuItem
            key={`${i}.${link.text}`}
            onClick={() => {
              handleClose();
              if (typeof link.to === "string") {
                navigateTo(link.to);
              } else {
                link.to();
              }
            }}
          >
            {link.text}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default SelectMenu;
