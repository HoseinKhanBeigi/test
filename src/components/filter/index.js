import { DropDown } from "../dropdown";
export const FilterDropDown = ({
  defaultQuery,
  items,
  handleChange,
  handleChangeCheckBox,
  handleChangeRadio,
}) => {
  return (
    <>
      {items.map((e, i) => (
        <DropDown
          defaultQuery={defaultQuery}
          key={i}
          data={e}
          open={e.open}
          handleClick={() => handleChange(e)}
          handleChangeCheckBox={handleChangeCheckBox}
          handleChangeRadio={handleChangeRadio}
        />
      ))}
    </>
  );
};
