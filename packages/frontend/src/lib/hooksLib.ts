import type { ChangeEvent, ChangeEventHandler } from "react";
import { useState } from "react";

interface FieldsType {
    [key: string | symbol]: string;
}

export function useFormFields(
    initialState: FieldsType
): [FieldsType, ChangeEventHandler] {
    const [fields, setValues] = useState(initialState);
    return [
        fields,
        function (event: ChangeEvent<HTMLInputElement>) {
            setValues({
                ...fields,
                [event.target.id]: event.target.value,
            });
            return;
        }
    ]
}