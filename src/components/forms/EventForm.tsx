import React, { useEffect, useState } from 'react'

import { format } from "date-fns";
import { useLocation } from 'react-router-dom'
import { enUS } from "date-fns/locale";
import * as yup from "yup";

import { Map } from '../map/Map';
import { Calendar } from '../calendar/Calendar';
import { TCalendarValue } from '../../types/calendar';
import { RootState, useAppDispatch, useAppSelector } from '../../store/store';
import { FormItem } from '../ui/FormItem';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Button, Form, Input, Select } from 'antd';
import ReactQuill from 'react-quill';
import { cn } from '../../lib/utils';
import { Title } from '../ui/Title';
import { IOption } from '../../types/store';
import { ImagesProps, UploadImages } from '../common/UploadImages';
import { getTickets } from '../../store/ticketSlice';


const validationSchema = yup.object().shape({
  title: yup.string().required('Required field'),
  descriptionText: yup.string().required('Required field').min(14, 'Minimum length is 14 characters'),
  address: yup.string().required('Address field is required'),
  date: yup.string().required('Required field'),
  adultPrice: yup.number().min(1, 'Adult price must be greater than 0').required('Required field'),
  childPrice: yup.number().min(1, 'Adult price must be greater than 0').required('Required field'),
  adultQuantityTickets: yup.number().min(1, 'Adult price must be greater than 0').required('Required field'),
  childrenQuantityTickets: yup.number().min(1, 'Adult price must be greater than 0').required('Required field'),
  time: yup.array().min(1, 'At least one time selection is required').of(
    yup.string().required('At least one time selection is required')
  ).required('At least one time selection is required'),
  images: yup.array().of(
    yup.object().shape({
      public_id: yup.string().required('Public ID is required'),
      url: yup.string().required('Image URL is required'),
    })
  ).test('at-least-one-image', 'One image is required', function (value) {
    if (!value || value.length === 0) {
      return false;
    }
    return true;
  }).required('At least one image is required'),
  ticketImgs: yup.string().required('At least one image is required'),
});

const timePicker: IOption[] = [{ value: "10:00", label: "10:00" }, { value: "11:00", label: "11:00" }, { value: "12:00", label: "12:00" }, { value: "13:00", label: "13:00" }, { value: "14:00", label: "14:00" }, { value: "15:00", label: "15:00" }, { value: "16:00", label: "16:00" }, { value: "17:00", label: "17:00" }, { value: "18:00", label: "18:00" }, { value: "19:00", label: "19:00" }, { value: "20:00", label: "20:00" }, { value: "21:00", label: "21:00" }]

export const EventForm = () => {

  const [valueCalendar, setValueCalendar] = useState<TCalendarValue>(new Date());
  const [selectedImages, setSelectedImages] = useState<any>('')

  const location = useLocation()

  const dispatch = useAppDispatch()
  const { tickets } = useAppSelector((state: RootState) => state.tickets)

  const { control, handleSubmit, formState: { errors }, setValue, getValues, register } = useForm({
    defaultValues: {
      title: '',
      descriptionText: '',
      address: '',
      date: '',
      adultPrice: 0,
      childPrice: 0,
      adultQuantityTickets: 0,
      childrenQuantityTickets: 0,
      time: [],
      images: []
    },
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    dispatch(getTickets())
  }, [])

  const ticketImages: any = [];


  tickets.forEach((i) => {
    ticketImages.push({
      value: i.ticket_images_id,
      label: i.title,
    });
  });


  const eventId = location.pathname.split("/")[3];

  const onSubmit: SubmitHandler<any> = (data) => {
    console.log(data)
  }

  const onImageUpload = (uploadedImages: ImagesProps[]) => {
    const simplifiedImagesUrls = uploadedImages.map(i => ({ public_id: i.public_id, url: i.url }) as any);
    setValue('images', simplifiedImagesUrls, { shouldValidate: true });

    return simplifiedImagesUrls
  }

  const onDateSelect = (selectedDate: TCalendarValue) => {
    setValueCalendar(selectedDate);
    const formattedDate = selectedDate && !Array.isArray(selectedDate) ? format(selectedDate, "dd.MM.yyyy", { locale: enUS }) : "";;
    setValue('date', formattedDate);
  }

  const selectedTitle = (titleId: any) => {
    const ticketImageUrl = tickets.find((t: any) => t.ticket_images_id === titleId)?.ticket_images.map((item: any) => item.url).join('')
    setSelectedImages(ticketImageUrl)
  }

  console.log('getValues', getValues());
  

  return (
    <div>
      <Title level={3}>{eventId !== undefined ? "Edit" : "Add"} Event</Title>
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}
      >
        <UploadImages
          register={register('images')}
          name='images'
          uploadedImages={onImageUpload}
          errors={errors.images}
        />
        <FormItem name='ticketImgs' control={control} label='Select image for your Event' help>
          <Select
            size="large"
            options={ticketImages}
            onSelect={selectedTitle}
          />
          {selectedImages.length ? <div className='my-4 w-full max-w-[900px] '>
            <img src={selectedImages} alt='ticketImage' />
          </div> : null }
        </FormItem>
        <FormItem name='title' control={control} label='Enter title' help>
          <Input size="large" />
        </FormItem>
        <div className='relative'>
          <Controller
            control={control}
            name="descriptionText"
            render={({ field }) => (
              <div>
                <Title level={5}>Add a description about the event</Title>
                <ReactQuill
                  theme="snow"
                  className={cn(`my-4 border-[1.5px] rounded-md`, errors.descriptionText ? 'border-[#ef090d]' : ' border-transparent')}
                  {...field}
                  onChange={(text) => {
                    field.onChange(text);
                  }}
                />
              </div>
            )}
          />
          {errors.descriptionText && <p className='absolute -bottom-[35px] left-[8px] text-[#ef090d]'>{errors.descriptionText.message}</p>}
        </div>
        <FormItem name='adultPrice' control={control} label='Enter adult price' help>
          <Input type='number' size="large" />
        </FormItem>
        <FormItem name='childPrice' control={control} label='Enter child price' help>
          <Input type='number' size="large" />
        </FormItem>
        <FormItem name='adultQuantityTickets' control={control} label='Enter adult quantity tickets' help>
          <Input type='number' size="large" />
        </FormItem>
        <FormItem name='childrenQuantityTickets' control={control} label='Enter children quantity tickets' help>
          <Input type='number' size="large" />
        </FormItem>
        <FormItem name='time' control={control} label='Select event time' help>
          <Select size="large" mode="multiple" options={timePicker} />
        </FormItem>
        <Map name='address' setSelectedAddress={(data: string) => setValue('address', data)} error={errors.address} />
        <div className='flex flex-col justify-start items-start'>
          <Title level={5}>Select a date for event</Title>
          <Calendar locale={enUS.code} onChange={onDateSelect} value={valueCalendar} />
        </div>
        <Form.Item>
          <Button className='w-[150px] mt-4' size="large" type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}