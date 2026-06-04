import { useState, useCallback, useContext } from "react";
import type { Column } from "../types/Column";
import { SnackContext } from "../providers/SnackProvider";
import { editColumns, getColumns } from "../services/columnsDataService";
import { getTasks } from "../services/tasksDataService";

function useColumns() {
  const [columns, setColumns] = useState<Column[]>([]);
  const { raiseSnack } = useContext(SnackContext) as {
    raiseSnack: (
      color: "success" | "error" | "warning" | "info",
      message: string,
    ) => void;
  };

  const handleGetColumns = useCallback(() => {
    try {
      const savedColumns = getColumns();
      setColumns(savedColumns);
    } catch {
      raiseSnack("error", "התרחשה שגיאה בייבוא הנתונים");
    }
  }, [raiseSnack]);

  const handleAddColumn = useCallback(
    (column: Pick<Column, "name">) => {
      const newColumn: Column = {
        ...column,
        id: crypto.randomUUID(),
      };

      setColumns((prev) => {
        const newColumns = [...prev, newColumn];
        editColumns(newColumns);
        return newColumns;
      });

      raiseSnack("success", "עמודה חדשה התווספה בהצלחה");
    },
    [raiseSnack],
  );

  const handleEditColumn = useCallback(
    (column: Column) => {
      setColumns((prev) => {
        const newColumns = prev.map((c) => (c.id === column.id ? column : c));
        editColumns(newColumns);
        return newColumns;
      });
      raiseSnack("success", "עמודה נערכה בהצלחה");
    },
    [raiseSnack],
  );

  const handleDeleteColumn = useCallback(
    (id: string) => {
      const tasks = getTasks();
      if (tasks.some((t: { column: string }) => t.column === id)) {
        raiseSnack(
          "warning",
          "שים לב! לא ניתן למחוק עמודה שמכילה משימות",
        );
        return;
      }

      setColumns((prev) => {
        const newColumns = prev.filter((c) => c.id !== id);
        editColumns(newColumns);
        return newColumns;
      });
      raiseSnack("success", "עמודה נמחקה בהצלחה");
    },
    [raiseSnack],
  );

  return {
    columns,
    handleGetColumns,
    handleAddColumn,
    handleEditColumn,
    handleDeleteColumn,
  };
}

export default useColumns;
