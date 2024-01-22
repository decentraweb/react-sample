import {Button, ButtonProps} from "@mui/material";
import {Link, LinkProps} from "react-router-dom";

type Props = LinkProps & ButtonProps;

function LinkButton(props: Props) {
  return (
    <Button component={Link} {...props}/>
  )
}

export default LinkButton;
