import { User } from "@/types";
import { View } from "react-native";
import { Button, InputForm } from "../inputs";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSchema } from "@/types/schemas";
import { InferType } from "yup";

export type FirstUserFormProps = {
    onValidate: (data: User) => void
}

export default function FirstUserForm({onValidate}: FirstUserFormProps)
{
    const {control, handleSubmit} = useForm({
        resolver: yupResolver(userSchema),
        defaultValues: {description: ''}
    })

    const submit = (data: InferType<typeof userSchema>) => {
        onValidate({...data, image: ''})
    }

    return (
        <View>
          <InputForm
            name='firstname'
            control={control} 
            placeholder='Votre nom'
          />
          <InputForm
            name="lastname"
            control={control} 
            placeholder='Votre Prenom (optionel)'
          />
          <Button
            title='Continuer'
            style={{marginTop: 20}}
            onPress={handleSubmit(submit)}
          />
        </View>
    )
}