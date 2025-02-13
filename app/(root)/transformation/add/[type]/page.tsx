import Header from '@/components/shared/Header'
import React from 'react'
import { transformationTypes } from '@/constants'
import TransformationForm from '@/components/shared/TransformationForm';
import { useAuth } from '@clerk/nextjs';
import { getUserById } from '@/lib/actions/user.actions';
import { auth } from '@clerk/nextjs/server';


const AddTransformationTypePage = async ({ params: { type } }: SearchParamProps) => {
  const transformation = transformationTypes[type];
  const { userId } = auth();
  const user = await getUserById(userId!);
  return (
    <>
      <Header
        title={transformation.title}
        subtitle={transformation.subTitle} />

      <section className='mt-10'>
        <TransformationForm
          action="Add"
          userId={user._id}
          type={type as TransformationTypeKey}
          creditBalance={user.creditBalance}
        />

      </section>
    </>
  )
}

export default AddTransformationTypePage