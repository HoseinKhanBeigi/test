import { Card, CardHeader } from "@mui/material";
import { PlusIcon } from "../../icons";

export const NoteCard = ({title,subheader}) => {
  return (
    <Card>
      <CardHeader title={title} subheader={subheader} />
    </Card>
  );
};
