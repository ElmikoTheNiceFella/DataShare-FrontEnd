/* Template1 Types */
type InputType = { [key: string]: FormDataEntryValue };

/* Modal File */
type ModalProps = {
  open: string[];
  close: () => void;
  addSection: (sectionName: string) => void;
  removeSection: (id: number) => void;
  removeComponent: (sectionID: number, componentID: number) => void;
  addText: (inputData: InputType, sectionID: number) => void;
  addFullName: (inputData: InputType, sectionID: number) => void;
}
type HandleSubmitArgs = string | [string, number] | [string, number, {[key:string]:(string|boolean)}];

// Add Components
type AddComponentProps = {
  setComponent: (component: string) => void;
}

// Add Section
type AddSectionProps = {
  close: () => void;
  handleSubmit: (type: string) => (e: React.SyntheticEvent) => void;
}

// Remove Component
type RemoveComponentProps = {
  componentType: string;
  componentID: number;
  sectionID: number;
  handleRemove: (sectionID: number, componentID: number) => void;
  close: () => void;
}

// Add Text Component
type TextEditProps = {
  back: (el: string) => void;
  sectionID: number;
  handleSubmit: (type: HandleSubmitArgs) => (e: React.SyntheticEvent) => void;
}