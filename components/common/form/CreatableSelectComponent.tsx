'use client'

import React, {useEffect, useState} from 'react';
import CreatableSelect from 'react-select/creatable';
import { FormikProps } from 'formik';
import RequiredFieldLabelComponent from "@/components/common/RequiredFieldLabelComponent";


interface OptionType {
    label: string;
    value: string;
}

interface CreatableSelectComponentProps {
    label: string;
    formik: FormikProps<any>;
    fieldName: string;
}

const CreatableSelectComponent: React.FC<CreatableSelectComponentProps> = ({ label, formik, fieldName }) => {
    const [inputValue, setInputValue] = useState<string>('');
    const [value, setValue] = useState<OptionType[]>([]);

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (!inputValue) return;
        switch (event.key) {
            case 'Enter':
            case 'Tab':
                setValue((prev) => {
                    const newValue = [...prev, createOption(inputValue)];
                    formik.setFieldValue(fieldName, newValue.map(option => option.label));
                    return newValue;
                });
                setInputValue('');
                event.preventDefault();
        }
    };

    const createOption = (label: string): OptionType => ({
        label,
        value: label.toLowerCase().replace(/\W/g, ''),
    });



    return (
        <div>
            <RequiredFieldLabelComponent
                labelText={label}
                labelClassName="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            />
            <CreatableSelect
                components={{ DropdownIndicator: null }}
                inputValue={inputValue}
                isClearable
                isMulti
                menuIsOpen={false}
                onChange={(newValue) => {
                    setValue(newValue as OptionType[]);
                    formik.setFieldValue(fieldName, newValue ? (newValue as OptionType[]).map(option => option.label) : []);
                }}
                onInputChange={(newValue) => setInputValue(newValue)}
                onKeyDown={handleKeyDown}
                placeholder="Type something and press enter..."
                value={value}
            />
            {/*{formik.errors[fieldName] ? <p className="text-red-700">{formik.errors[fieldName]}</p> : null}*/}
        </div>
    );
};

export default CreatableSelectComponent;
