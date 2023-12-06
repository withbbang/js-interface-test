export interface CustomWindow extends Window {
  onResult?: (data?: any) => any;
}
