export interface ControlProps {
  storeFileFunc: (value: string) => void;
  handleExportCount: (reset?: boolean) => void;
}

export interface SaveToPCProps {
  handleExportCount: (reset?: boolean) => void;
}

export interface LoadFromPCProps {
  liftImageFunc: (value: string) => void;
}
