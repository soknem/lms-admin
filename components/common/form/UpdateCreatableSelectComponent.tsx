import React, { useState, useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';

interface Option {
    readonly label: string;
    readonly value: string;
}

const components = {
    DropdownIndicator: null,
};

const createOption = (label: string) => ({
    label,
    value: label,
});

interface UpdateCreatableSelectComponentProps {
    label: string;
    fieldName: string;
    formik: any; // Replace 'any' with the actual type of your Formik form values
}

const UpdateCreatableSelectComponent: React.FC<UpdateCreatableSelectComponentProps> = ({ label, fieldName, formik }) => {
    const [inputValue, setInputValue] = useState('');
    const [value, setValue] = useState<Option[]>(formik.values[fieldName] || []);

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (!inputValue) return;
        switch (event.key) {
            case 'Enter':
            case 'Tab':
                const newValue = [...value, createOption(inputValue)];
                formik.setFieldValue(fieldName, newValue);
                setValue(newValue);
                setInputValue('');
                event.preventDefault();
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        setValue(formik.values[fieldName] || []);
    }, [formik.values[fieldName]]);


    return (
        <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
            <CreatableSelect
                components={components}
                inputValue={inputValue}
                isClearable
                isMulti
                menuIsOpen={false}
                onChange={(newValue) => {
                    setValue([...newValue]);
                    formik.setFieldValue(fieldName, newValue);
                }}
                onInputChange={(newValue) => setInputValue(newValue)}
                onKeyDown={handleKeyDown}
                placeholder="Type something and press enter..."
                value={value}
            />
            {formik.touched[fieldName] && formik.errors[fieldName] && (
                <div className="text-red-700">{formik.errors[fieldName]}</div>
            )}
        </div>
    );
};

export default UpdateCreatableSelectComponent;