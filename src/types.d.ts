// SVG Export Fix
declare module "*.svg" {
  const content: any;
  export default content;
}

interface StateProps {
  title: string;
  description: string;
}

/* -----------------------*/
/* Default Template Types */
/* -----------------------*/

type InputType = { [key: string]: FormDataEntryValue };

/* Modal File */
type AddComponent = (inputData: InputType, sectionID: number) => void;
type ModalProps = {
  open: string[];
  close: () => void;
  addSection: (sectionName: string) => void;
  removeSection: (id: number) => void;
  removeComponent: (sectionID: number, componentID: number) => void;
  handlePublish: (content:any) => void;
  content: any;
  addText: AddComponent;
  addFullName: AddComponent;
  addGender: AddComponent;
  addCountry: AddComponent;
  addYesOrNo: AddComponent;
  addChoices: AddComponent;
}
type HandleSubmitArgs = string | [string, number] | [string, number, ({ [key: string]: any } | string)];

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

// Component Props
type ComponentProps = {
  styles: CSSModuleClasses;
  component: any;
  open: (arg: [string, string, number, number]) => void;
  position: number;
  section: any;
}
// Text Component
type TextEditProps = {
  back: (el: string) => void;
  sectionID: number;
  handleSubmit: (type: HandleSubmitArgs) => (e: React.SyntheticEvent) => void;
}

type PublishProps = { 
  content: any; 
  close: () => void;
  handlePublish: (content:any) => void;
}