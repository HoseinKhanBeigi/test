import React, { useEffect, useRef, useState } from "react";
import { Grid, Stack, Box } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import { Typography } from "@mui/material";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { PlusIcon, TrashIcone, EditIcon } from "../../components/icons";
import { useReducer } from "react";

import {
  FormProvider,
  RHFTextField,
  RHSelectField,
  RHMultiSelect,
  RHFCheckbox,
} from "../../components/hook-form";

export const AddAgents = ({
  t,
  onChangeAgents,
  agentsList,
  statusDetail,
  typeForm,
}) => {
  const agent_name = useRef();
  const agent_phone = useRef();
  const agent_position = useRef();

  const [error, seterror] = useState(false);

  const [isSave, setIsSave] = useState(false);

  const createInitialState = useRef({
    agents: [],
    counter: 0,
  });

  useEffect(() => {
    if (statusDetail === "succeeded" && typeForm === "edit") {
      createInitialState.current.agents = agentsList;
      createInitialState.current.counter = agentsList.length;

      agentsList.map((e) => {
        agent_name.current.value = e.name;
        agent_phone.current.value = e.phone;
        agent_position.current.value = e.position;
      });
    } else {
      createInitialState.current.agents = [];
      createInitialState.current.counter = 0;
      agent_name.current.value = "";
      agent_phone.current.value = "";
      agent_position.current.value = "";
    }
  }, [statusDetail, typeForm]);

  const handleChange = (e) => {
    if (
      agent_name.current.value &&
      agent_phone.current.value &&
      agent_position.current.value
    ) {
      console.log("tesss");
      setIsSave(true);
    } else {
      setIsSave(false);
    }
  };

  function reducer(state, action) {
    switch (action.type) {
      case "added_todo": {
        agent_name.current.value = "";
        agent_phone.current.value = "";
        agent_position.current.value = "";

        if (
          action.agent_name !== "" &&
          action.agent_phone !== "" &&
          action.agent_position !== ""
        ) {
          seterror(false);
          setIsSave(false);
          const newCounter = state.counter + 1;

          return {
            counter: newCounter,
            agents: [
              ...state.agents,
              {
                agent_name: action.agent_name,
                agent_phone: action.agent_phone,
                agent_position: action.agent_position,
                mode: "edit",
                actionMode: "add",
                id: newCounter,
              },
            ],
          };
        } else {
          seterror(true);
          return {
            agents: [...state.agents],
          };
        }
      }
      case "edit": {
        agent_name.current.value = action.agent_name;
        agent_phone.current.value = action.agent_phone;
        agent_position.current.value = action.agent_position;

        const idx = state.agents.findIndex((t) => t.id === action.id);
        const agent = Object.assign({}, state.agents[idx]);
        agent.mode = "cancel";
        agent.actionMode = "update";
        const agents = Object.assign([], state.agents);
        agents.splice(idx, 1, agent);
        return {
          agents: agents,
        };
      }
      case "save": {
        const idx = state.agents.findIndex((t) => t.id === action.id);
        agent_name.current.value = "";
        agent_phone.current.value = "";
        agent_position.current.value = "";
        const agent = Object.assign({}, state.agents[idx]);
        agent.agent_name = action.agent_name;
        agent.agent_phone = action.agent_phone;
        agent.agent_position = action.agent_position;
        agent.actionMode = "add";
        agent.mode = "edit";
        const agents = Object.assign([], state.agents);

        agents.splice(idx, 1, agent);
        return {
          agents: agents,
        };
      }
      case "cancel": {
        agent_name.current.value = "";
        agent_phone.current.value = "";
        agent_position.current.value = "";
        const idx = state.agents.findIndex((t) => t.id === action.id);
        const agent = Object.assign({}, state.agents[idx]);
        agent.mode = "edit";
        agent.actionMode = "add";
        const agents = Object.assign([], state.agents);
        agents.splice(idx, 1, agent);
        return {
          counter: state.counter,
          agents: [
            ...state.agents,
            {
              agent_name: action.agent_name,
              agent_phone: action.agent_phone,
              agent_position: action.agent_position,
              mode: "edit",
              actionMode: "add",
            },
          ],
          agents: agents,
        };
      }
      case "remove": {
        const idx = state.agents.findIndex(
          (t) => t.agent_name === action.agent_name
        );
        const agents = Object.assign([], state.agents);
        agents.splice(idx, 1);
        return {
          agents: agents,
        };
      }
      default:
        return state;
    }
  }

  const [stateAgents, dispatch] = useReducer(
    reducer,
    createInitialState.current
  );

  return (
    <>
      <Grid container item md={6} mt={1} flexDirection="column" rowSpacing={2}>
        <Grid item>
          <Grid container justifyContent={"space-between"} alignItems="center">
            <Typography>{"نماینده مشتری"}</Typography>
            <Grid item>
              {!isSave ? (
                <IconButton
                  sx={{ p: "0px" }}
                  aria-label="menu"
                  disabled={!isSave}
                >
                  <PlusIcon />
                </IconButton>
              ) : (
                <Button
                  variant="text"
                  onClick={() => {
                    dispatch({
                      type: "added_todo",
                      agent_name: agent_name.current.value,
                      agent_phone: agent_phone.current.value,
                      agent_position: agent_position.current.value,
                    });
                  }}
                >
                  <Typography>{"ذخیره"}</Typography>
                </Button>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <TextField
            error={error}
            fullWidth
            name="name_agent"
            inputRef={agent_name}
            label={t("fullName")}
            onChange={handleChange}
          />
        </Grid>
        <Grid item>
          <TextField
            error={error}
            fullWidth
            name="phone_agent"
            inputRef={agent_phone}
            label={t("phone")}
            onChange={handleChange}
          />
        </Grid>
        <Grid item>
          <TextField
            fullWidth
            error={error}
            name="position_agent"
            inputRef={agent_position}
            label={t("position")}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
      <Grid container item sm={6} mt={2}>
        <Paper sx={{ width: "100%" }}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table" dir="rtl">
              <TableBody>
                {onChangeAgents(stateAgents.agents)}
                {stateAgents.agents.map((e, i) => (
                  <TableRow key={i} role="checkbox">
                    <TableCell align="right">
                      {e.agent_name || e?.name}
                    </TableCell>
                    <TableCell align="right">
                      {e.agent_phone || e?.phone}
                    </TableCell>
                    <TableCell align="right">
                      {e.agent_position || e?.position}
                    </TableCell>
                    <TableCell align="right">
                      {e.actionMode === "update" && (
                        <IconButton
                          sx={{ p: "10px" }}
                          aria-label="menu"
                          onClick={() =>
                            dispatch({
                              type: "save",
                              agent_name: agent_name.current.value || e?.name,
                              agent_phone:
                                agent_phone.current.value || e?.phone,
                              agent_position:
                                agent_position.current.value || e?.position,
                              id: e.id,
                            })
                          }
                        >
                          <SaveIcon />
                        </IconButton>
                      )}

                      <IconButton
                        sx={{ p: "10px" }}
                        aria-label="menu"
                        onClick={() =>
                          dispatch({
                            type: "remove",
                            agent_name: e.agent_name,
                          })
                        }
                      >
                        <TrashIcone />
                      </IconButton>
                      {e.mode === "edit" ? (
                        <IconButton
                          sx={{ p: "10px" }}
                          aria-label="menu"
                          onClick={() => {
                            dispatch({
                              type: "edit",
                              agent_name: e.agent_name || e?.name,
                              agent_phone: e.agent_phone || e?.phone,
                              agent_position: e.agent_position || e?.position,
                              mode: e.mode,
                              id: e.id,
                            });
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                      ) : (
                        <IconButton
                          sx={{ p: "10px" }}
                          aria-label="menu"
                          onClick={() => {
                            dispatch({
                              type: "cancel",
                              agent_name: e.agent_name,
                              agent_phone: e.agent_phone,
                              agent_position: e.agent_position,
                              mode: e.mode,
                              id: e.id,
                            });
                          }}
                        >
                          <CancelIcon />
                        </IconButton>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
    </>
  );
};
