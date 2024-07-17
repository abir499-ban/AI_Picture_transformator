"use client"

import React, { useState } from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { aspectRatioOptions, defaultValues, transformationTypes } from '@/constants'
import { title } from 'process'
import { CustomField } from './CustomField'
import Selectfunction from './Select'
import { AspectRatioKey } from '@/lib/utils'

export const formSchema = z.object({
    title: z.string(),
    color: z.string().optional(),
    aspectratio: z.string().optional(),
    prompt: z.string().optional(),
    publicid: z.string(),
})

const TransformationForm = ({ data = null, action, userId, type, creditBalance, config = null }: TransformationFormProps) => {
    const [image, setimage] = useState();
    const [newtransformation, setnewtransformation] = useState<Transformations | null>(null)
    const [isSubmitting, setisSubmitting] = useState(false);
    const [istransforming, setistransforming] = useState(false);
    const [transformationconfig, settransformationconfig] = useState(config);



    const transformationType = transformationTypes[type];
    const Type = transformationType.type;
    const initialValues = data && action === 'Update' ? {
        title: data?.title,
        color: data?.color,
        aspectratio: data?.aspectratio,
        prompt: data?.prompt,
        publicid: data?.publicid
    } : defaultValues
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialValues
    })
    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }
    const onSelectFieldHandler = (value: string, onChangeField: (value: string) => void) => {

    }
    const onInputChangeHandler = (fieldName: string, feildvalue: string, type: string, onChangeField: (value: string) => void) => {

    }
    const TransformationHandler = ()=>{

    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <CustomField
                    control={form.control}
                    name='title'
                    formLabel='Image Title'
                    className='w-full'
                    render={({ field }) => <Input
                        {...field}
                        className='input-field'
                    />}
                />
                {Type === 'fill' && <CustomField
                    control={form.control}
                    name='aspectratio'
                    formLabel='Aspect Ratio'
                    className='w-full'
                    render={({ field }) => (
                        <Select
                            onValueChange={(value) => { onSelectFieldHandler(value, field.onChange) }}
                        >
                            <SelectTrigger className="select-field">
                                <SelectValue placeholder="Aspect Ratios" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.keys(aspectRatioOptions).map((key) => (
                                    <SelectItem key={key} value={key} className='select-item'>
                                        {aspectRatioOptions[key as AspectRatioKey].label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                />}

                {(Type === 'recolor' || Type === "remove") && (
                    <div className='prompt-feild'>
                        <CustomField
                            control={form.control}
                            name='prompt'
                            formLabel={
                                Type === 'remove' ? 'Object Removal' : 'Object Recolor'
                            }
                            className='w-full'
                            render={({ field }) => <Input
                                value={field.value}
                                className='input-field'
                                onChange={(e) => onInputChangeHandler(
                                    'prompt',
                                    e.target.value,
                                    Type,
                                    field.onChange
                                )}
                            />}
                        />
                        {Type === "recolor" && (
                            <CustomField
                                control={form.control}
                                name='color'
                                formLabel='Tell your color'
                                className='w-full'
                                render={({ field }) => <Input
                                    value={field.value}
                                    className='input-field'
                                    onChange={(e) => onInputChangeHandler(
                                        'color',
                                        e.target.value,
                                        'recolor',
                                        field.onChange
                                    )} />}
                            />
                        )}

                    </div>
                )}
                <div className='flex flex-col gap-2'>
                    <Button type='button'
                        className='bg-blue-500 px-10 hover:bg-blue-950'
                        disabled={newtransformation===null && !istransforming}
                        onClick={TransformationHandler}
                    >Apply Changes</Button>
                    
                    <Button type='submit'
                        className='bg-blue-500 px-10 hover:bg-blue-950'
                        disabled={!isSubmitting}
                    >Save</Button>

                </div>
            </form>
        </Form>
    )
}

export default TransformationForm