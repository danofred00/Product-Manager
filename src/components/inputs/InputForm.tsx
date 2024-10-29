import { useController, Control } from "react-hook-form"
import InputText, { InputTextProps } from "./InputText"
import TextError from "../typography/TextError"

export type InputFormProps = InputTextProps & {
    control: Control<any, any>,
    name: string,
    defaultValue?: any
}

export default function InputForm({control, name, defaultValue, ...props}: InputFormProps) {

    const {field: {value, onChange}, fieldState: {error}} = useController({control, name, defaultValue})
    
    const currentValue = value ?? ( defaultValue === undefined ? '' : String(defaultValue))

    return (
        <>
            <InputText {...props} value={currentValue} onChangeText={onChange}/>
            {error && <TextError>{error.message}</TextError>}
        </>
    )
}