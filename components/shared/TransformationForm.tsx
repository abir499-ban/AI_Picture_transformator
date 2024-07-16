"use client"

import React from 'react'
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

export const formSchema = z.object({
    title: z.string(),
    color: z.string().optional(),
    aspectratio: z.string().optional(),
    prompt: z.string().optional(),
    publicid: z.string(),
})

const TransformationForm = ({ data = null, action, userId, type, creditBalance}: TransformationFormProps) => {
    const TranformationType =  transformationTypes[type];
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
                {}
            </form>
        </Form>
    )
}

export default TransformationForm