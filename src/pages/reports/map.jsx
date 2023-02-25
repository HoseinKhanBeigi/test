import { MapData } from "./mapData";
import { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reportsAction } from "../../actions/reports";
export const MapIran = ({ handleDispatch }) => {
  const dispatch = useDispatch();

  const { status, entities, error } = useSelector(
    (state) => state.reportsSlice
  );

  const reducer = (state, action) => {
    switch (action.type) {
      case "PROVINCE":
        return state.map((item) => {
          if (item.id === action.item.id) {
            return { ...item, status: !item.status, count: action.count };
          } else {
            return { ...item, status: false };
          }
        });
      default:
        return state;
    }
  };

  const [items, dispatchAction] = useReducer(reducer, MapData);

  const handleClick = (item) => {
    const city = entities.data.find((e) => e.province === item?.name?.d);
    dispatchAction({
      type: "PROVINCE",
      item,
      count: city === undefined ? 0 : city?.count,
    });
    handleDispatch(item);
  };

  useEffect(() => {
    dispatch(reportsAction({}));
  }, []);

  return (
    <svg
      width="618"
      height="561"
      viewBox="0 0 618 561"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_1863_4883)">
        {items.map((element) => {
          return (
            <svg onClick={() => handleClick(element)} style={{cursor:"pointer"}}>
              <path
                d={element.province.d}
                fill="#F7541E"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <svg>
                <text
                  transform={element.transform}
                  x={element?.name?.x}
                  y={element?.name?.y}
                  fill={element?.name?.fill}
                  font-size={element?.name?.fontSize}
                >
                  {element?.name?.d}
                </text>
              </svg>
              {element.status && (
                <>
                  <path d={element?.popup?.pathRect.d} fill="#5041BC" />
                  <ellipse
                    cx={element?.popup?.ellipse1.cx}
                    cy={element?.popup?.ellipse1.cy}
                    rx={element?.popup?.ellipse1.rx}
                    ry={element?.popup?.ellipse1.ry}
                    fill="#5041BC"
                  />
                  <ellipse
                    cx={element?.popup?.ellipse2.cx}
                    cy={element?.popup?.ellipse2.cy}
                    rx={element?.popup?.ellipse2.rx}
                    ry={element?.popup?.ellipse2.ry}
                    fill="white"
                  />
                  <text
                    x={element?.popup?.count?.x}
                    y={element?.popup?.count?.y}
                    fill="#5041BC"
                    font-size="0.8em"
                  >
                    {element?.count}
                  </text>
                </>
              )}
            </svg>
          );
        })}
      </g>
      <defs>
        <clipPath id="clip0_1863_4883">
          <rect width="618" height="561" rx="8" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
