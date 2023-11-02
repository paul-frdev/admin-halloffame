import Select, {
  Props as SelectProps,
  GroupBase, 
} from "react-select";

export type IOption = {
  value: any;
  label: string;
  icon?: string;
};

export function CustomSelect (props: any) {

  console.log('props', props.field);
  

  return (
    <>
    <Select value={props.value}  name={props.name} options={props.options} isMulti={props.isMulti} onChange={props.onChange} onBlur={props.onBlur} {...props} />
    </>
    
  );
}


