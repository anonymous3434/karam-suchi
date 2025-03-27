import * as React from "react";
import clsx from "clsx";
import { styled, useTheme, alpha } from "@mui/material/styles";
import { Button } from "@mui/material";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AssignmentIcon from "@mui/icons-material/Assignment";
import DoNotDisturbAltSharpIcon from "@mui/icons-material/DoNotDisturbAltSharp";
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";
import AllInclusiveOutlinedIcon from "@mui/icons-material/AllInclusiveOutlined";
import CategoryIcon from "@mui/icons-material/Category";
import Label from "@mui/icons-material/Label";
import DonutLargeSharpIcon from "@mui/icons-material/DonutLargeSharp";
import SettingsIcon from "@mui/icons-material/Settings";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import {
  TreeItem2Content,
  TreeItem2IconContainer,
  TreeItem2Root,
  TreeItem2GroupTransition,
} from "@mui/x-tree-view/TreeItem2";
import { useTreeItem2 } from "@mui/x-tree-view/useTreeItem2";
import { TreeItem2Provider } from "@mui/x-tree-view/TreeItem2Provider";
import { TreeItem2Icon } from "@mui/x-tree-view/TreeItem2Icon";

const CustomTreeItemRoot = styled(TreeItem2Root)(({ theme, darkMode }) => ({
  color: theme.palette.text.secondary,
}));

const CustomTreeItemContent = styled(TreeItem2Content)(
  ({ theme, darkMode }) => ({
    marginBottom: theme.spacing(0.3),
    color: darkMode ? "white" : theme.palette.text.secondary,
    borderRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    "&.expanded": {
      fontWeight: theme.typography.fontWeightRegular,
    },
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
    "&.focused, &.selected, &.selected.focused": {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
      color: "var(--tree-view-color)",
    },
  })
);

const CustomTreeItemIconContainer = styled(TreeItem2IconContainer)(
  ({ theme }) => ({
    marginRight: theme.spacing(1),
  })
);

const CustomTreeItemGroupTransition = styled(TreeItem2GroupTransition)(
  ({ theme }) => ({
    marginLeft: 0,
    [`& .content`]: {
      paddingLeft: theme.spacing(2),
    },
  })
);

const CustomTreeItem = React.forwardRef(function CustomTreeItem(props, ref) {
  const { darkMode } = props;
  const theme = useTheme();
  const {
    id,
    itemId,
    label,
    disabled,
    children,
    bgColor,
    color,
    labelIcon: LabelIcon,
    labelInfo,
    colorForDarkMode,
    bgColorForDarkMode,
    ...other
  } = props;

  const {
    getRootProps,
    getContentProps,
    getIconContainerProps,
    getLabelProps,
    getGroupTransitionProps,
    status,
  } = useTreeItem2({ id, itemId, children, label, disabled, rootRef: ref });

  const style = {
    "--tree-view-color":
      theme.palette.mode !== "dark" ? color : colorForDarkMode,
    "--tree-view-bg-color":
      theme.palette.mode !== "dark" ? bgColor : bgColorForDarkMode,
  };

  return (
    <TreeItem2Provider itemId={itemId}>
      <CustomTreeItemRoot
        {...getRootProps({ ...other, style })}
        darkMode={darkMode}
      >
        <CustomTreeItemContent
          {...getContentProps({
            className: clsx("content", {
              expanded: status.expanded,
              selected: status.selected,
              focused: status.focused,
            }),
          })}
          darkMode={darkMode}
        >
          <CustomTreeItemIconContainer {...getIconContainerProps()}>
            <TreeItem2Icon status={status} />
          </CustomTreeItemIconContainer>
          <Box
            sx={{
              display: "flex",
              flexGrow: 1,
              alignItems: "center",
              p: 0.5,
              pr: 0,
            }}
          >
            <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
            <Typography
              {...getLabelProps({
                variant: "body2",
                sx: { display: "flex", fontWeight: "inherit", flexGrow: 1 },
              })}
            />
            <Typography variant="caption" color="inherit">
              {labelInfo}
            </Typography>
          </Box>
        </CustomTreeItemContent>
        {children && (
          <CustomTreeItemGroupTransition {...getGroupTransitionProps()} />
        )}
      </CustomTreeItemRoot>
    </TreeItem2Provider>
  );
});

function EndIcon() {
  return <div style={{ width: 24 }} />;
}
const InitialStatus = [
  {
    name: "All",
    label: AllInclusiveOutlinedIcon,
    bgcolor: "#e8f0fe",
    color: "#1a73e8",
  },
  {
    name: "Done",
    label: DoneAllOutlinedIcon,
    bgcolor: "#CAE0BC",
    color: "#5B913B",
  },
  {
    name: "Not Done",
    label: DoNotDisturbAltSharpIcon,
    bgcolor: "#FF9C73",
    color: "#FB4141",
  },
];
export default function SideNav({
  category,
  selectedStatus,
  setSelectedStatus,
  selectedCategory,
  setSelectedCategory,
  setIsOpen,
  tasks,
  darkMode,
}) {
  return (
    <SimpleTreeView
      aria-label="gmail"
      //   defaultExpandedItems={["3"]}
      defaultSelectedItems="5"
      slots={{
        expandIcon: ArrowRightIcon,
        collapseIcon: ArrowDropDownIcon,
        endIcon: EndIcon,
      }}
      sx={{
        flexGrow: 1,
        maxWidth: 300,
        background: darkMode
          ? "linear-gradient(135deg, #1a1a1a 0%, #333 100%)"
          : "white",
      }}
    >
      <CustomTreeItem
        itemId="1"
        label="All Tasks"
        labelIcon={AssignmentIcon}
        bgColor="#FFEFC8"
        darkMode={darkMode}
        sx={{
          "&.MuiTreeItem-label": {
            color: "yellow", // Default color for the label
          },
        }}
      />
      <CustomTreeItem
        itemId="2"
        label="Status"
        labelIcon={DonutLargeSharpIcon}
        bgColor="#FFEFC8"
        darkMode={darkMode}
      >
        {InitialStatus.map((status) => (
          <CustomTreeItemStatus
            key={status.name}
            status={status}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            darkMode={darkMode}
          />
        ))}
      </CustomTreeItem>
      <CustomTreeItem
        itemId="3"
        label="Categories"
        labelIcon={Label}
        bgColor="#FFEFC8"
        darkMode={darkMode}
      >
        {category.map((category) => (
          <CustomTreeItemCategory
            key={category.name}
            tasks={tasks}
            category={category}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            darkMode={darkMode}
          />
        ))}
        <Button
          variant="text"
          startIcon={<AddCircleOutlineIcon />}
          sx={{
            textTransform: "none",
            fontWeight: "bold",
            fontSize: "0.875rem",
            padding: "8px 16px",
            width: "100%",
            borderRadius: 10,
            display: "flex",
            justifyContent: "center",
            "&:hover": {
              backgroundColor: alpha("#00b4ff", 0.2),
            },
          }}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          Add New Category
        </Button>
      </CustomTreeItem>
      <CustomTreeItem
        itemId="4"
        label="Settings"
        labelIcon={SettingsIcon}
        bgColor="#FFEFC8"
        darkMode={darkMode}
      ></CustomTreeItem>
    </SimpleTreeView>
  );
}

function CustomTreeItemStatus({
  status,
  selectedStatus,
  setSelectedStatus,
  darkMode,
}) {
  const isSelected = selectedStatus === status.name;

  return (
    <CustomTreeItem
      key={crypto.randomUUID()}
      itemId={status.name}
      label={status.name}
      labelIcon={status.label}
      color={isSelected ? status.color : null}
      darkMode={darkMode}
      bgColor={isSelected ? alpha(status.bgcolor, 0.8) : "white"}
      colorForDarkMode={isSelected ? "#FFF" : "#B8E7FB"}
      bgColorForDarkMode={
        isSelected ? alpha("#00b4ff", 0.4) : alpha("#00b4ff", 0.2)
      }
      onClick={() => setSelectedStatus(status.name)}
    />
  );
}

function CustomTreeItemCategory({
  category,
  selectedCategory,
  setSelectedCategory,
  tasks,
  darkMode,
}) {
  const isSelected = category.name === selectedCategory;
  const categoryCount = tasks.filter(
    (task) => task.category === category.name
  ).length;

  return (
    <CustomTreeItem
      key={crypto.randomUUID()}
      itemId={category.name}
      label={category.name}
      labelIcon={CategoryIcon}
      labelInfo={categoryCount}
      color={isSelected ? "#1a73e8" : null}
      darkMode={darkMode}
      bgColor={isSelected ? alpha("#e8f0fe", 0.8) : "white"}
      colorForDarkMode={isSelected ? "#FFF" : "#B8E7FB"}
      bgColorForDarkMode={
        isSelected ? alpha("#00b4ff", 0.4) : alpha("#00b4ff", 0.2)
      }
      onClick={() => setSelectedCategory(category.name)}
    />
  );
}
