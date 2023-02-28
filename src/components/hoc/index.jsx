const UpdatedComponent = (OriginalComponent,handleClick) => {
  function NewComponent(props) {
    const [openDialog, setOpenDialog] = React.useState(false);
    // handleClick(setOpenDialog(true))
    return (
      <OriginalComponent
      open={openDialog}
      setOpen={setOpenDialog}
      title="یادداشت جدید"
      page="home"
      />
    );
  }
};
