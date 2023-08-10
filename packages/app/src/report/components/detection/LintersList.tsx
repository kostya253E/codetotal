import {
  List,
  ListItem,
  ListItemButton,
  Theme,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { makeStyles } from "tss-react/mui";
import { ReportStore, useReportStore } from "../../stores/fe-report-store";
import { LinterLogo } from "./LinterLogo";
import { LinterStatus } from "./LinterStatus";

export const LintersList: FC = () => {
  const { classes } = useStyles();
  const { linters = [], issuesCount, selectedLinterName } = useReportStore();

  const handleToolClick = (name: string) => {
    ReportStore.setState({ selectedLinterName: name });
  };

  return (
    <div className={classes.lintersList}>
      <List className={classes.list}>
        {linters.map((linter, index) => {
          const issues = issuesCount(linter.name);

          return (
            <ListItem
              key={linter.name || ""}
              disablePadding
              divider={index < linters.length - 1}
            >
              <ListItemButton
                selected={linter.name === selectedLinterName}
                onClick={() => handleToolClick(linter.name)}
                className={classes.listItem}
              >
                <LinterLogo className={classes.nameContainer} linter={linter} />

                <div className={classes.statsContainer}>
                  {issues > 0 && (
                    <Typography variant="body2" color="text.secondary">
                      {issues} issues
                    </Typography>
                  )}

                  <LinterStatus
                    severity={linter.severity}
                    status={linter.status}
                  />
                </div>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

const useStyles = makeStyles()((theme: Theme) => ({
  lintersList: {
    overflow: "hidden",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  listItem: {
    minHeight: 50,
  },
  nameContainer: {
    flexGrow: 1,
  },
  statsContainer: {
    display: "flex",
    gap: theme.spacing(2),
  },
}));