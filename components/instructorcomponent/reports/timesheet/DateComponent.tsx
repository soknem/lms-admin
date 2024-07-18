import React, { useState, Dispatch, SetStateAction } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const FormSchema = z.object({
    dob: z.date({ required_error: "A date of birth is required." }),
});

interface DateComponentProps {
    selectedDate: Date;
    onDateChange: Dispatch<SetStateAction<Date>>;
}

export function DateComponent({ selectedDate, onDateChange }: DateComponentProps) {
    const [showDatePicker, setShowDatePicker] = useState(false);
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: { dob: selectedDate },
    });

    const handleDateSelect = (date: Date | null) => {
        if (date) {
            form.setValue("dob", date);
            setShowDatePicker(false);
            onDateChange(date);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit((data) => console.log(data))} className="space-y-8">
                <FormField
                    control={form.control}
                    name="dob"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <Popover open={showDatePicker} onOpenChange={setShowDatePicker}>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            onClick={(e) => {
                                                e.preventDefault(); // Prevents form submission
                                                setShowDatePicker((prev) => !prev);
                                            }}
                                            className={cn(
                                                "w-[200px] pl-3 text-lg font-bold bg-lms-white-80 text-lms-primary",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, "MM / yyyy")
                                            ) : (
                                                <span>5 / 2024</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-6 w-6 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <DatePicker
                                        selected={field.value}
                                        onChange={(date) => handleDateSelect(date)}
                                        dateFormat="MM / yyyy"
                                        showMonthYearPicker
                                        maxDate={new Date()}
                                        minDate={new Date("1900-01-01")}
                                        inline
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
}
