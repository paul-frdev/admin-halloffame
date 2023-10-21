import React, { useEffect, useState } from 'react'

import { format } from "date-fns";
import { useLocation } from 'react-router-dom'
import { enUS } from "date-fns/locale";
import * as yup from "yup";
import { useFormik } from "formik";
import { ImageUrls } from '../../types/store';
import { CustomInput } from '../ui/CustomInput';
import { UploadImages } from '../ui/UploadImages';
import { Button } from '../ui/Button';
import { Select } from '../ui/Select';
import { Map } from '../map/Map';
import { Calendar } from '../calendar/Calendar';
import { TCalendarValue } from '../../types/calendar';
import { RootState, useAppDispatch, useAppSelector } from '../../store/store';

const schema = yup.object().shape({
  title: yup.string().required("Category Name is Required"),
});

interface FormikProps {
  title: string;
  descriptionText: string;
  date?: string;
  time: string[];
  image: ImageUrls[];
  location: string;
  adultPrice: number;
  childPrice: number;
  adultQuantityTickets: number;
  childrenQuantityTickets: number;
}

const timePicker = [{ id: 1, time: "10:00" }, { id: 2, time: "11:00" }, { id: 2, time: "12:00" }, { id: 3, time: "13:00" }, { id: 4, time: "14:00" }, { id: 5, time: "15:00" }, { id: 6, time: "16:00" }, { id: 7, time: "17:00" }, { id: 8, time: "18:00" }, { id: 9, time: "19:00" }, { id: 10, time: "20:00" }, { id: 11, time: "21:00" }]

export const EventForm = () => {

  const [selectedTime, setSelectedTime] = useState<string[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<string>('');
  const [valueCalendar, setValueCalendar] = useState<TCalendarValue>(new Date());

  const location = useLocation()

  const formattedValueCalendar = valueCalendar && !Array.isArray(valueCalendar) ? format(valueCalendar, "dd.MM.yyyy", { locale: enUS }) : "";


  const formik = useFormik<FormikProps>({
    enableReinitialize: true,
    initialValues: {
      title: "",
      descriptionText: "",
      time: [],
      image: [],
      location: "",
      adultPrice: 0,
      childPrice: 0,
      adultQuantityTickets: 0,
      childrenQuantityTickets: 0,
      date: ''
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      console.log(values);

    },
  });


  const eventId = location.pathname.split("/")[3];

  useEffect(() => {
    formik.values.location = selectedAddress && selectedAddress.length > 0 ? selectedAddress : ""
    formik.values.date = formattedValueCalendar && formattedValueCalendar.length > 0 ? formattedValueCalendar : ''
  }, [formattedValueCalendar, selectedAddress]);

  console.log('formik.values', formik.values);

  const handleTime = (e: string[]) => {
    setSelectedTime(e)
  }

  return (
    <div>
      <h2 className='text-2xl font-semibold mb-6'>Create a new event</h2>
      <form action="" onChange={formik.handleSubmit}>
        <UploadImages />
        <CustomInput
          type='text'
          label='Enter Event title'
          name='title'
          onChange={formik.handleChange("title")}
          onBlur={formik.handleBlur("title")}
          value={formik.values.title}
          formikTouched={formik.touched.title}
          formikErrors={formik.errors.title}
        />
        <CustomInput
          type='text'
          label='Enter Event description'
          name='descriptionText'
          onChange={formik.handleChange("descriptionText")}
          onBlur={formik.handleBlur("descriptionText")}
          value={formik.values.descriptionText}
          formikTouched={formik.touched.descriptionText}
          formikErrors={formik.errors.descriptionText}
        />
        <div className='mb-2'>Enter Event location</div>
        <Map setSelectedAddress={setSelectedAddress} />
        <CustomInput
          type='number'
          label='Enter Event price for adults'
          name='adultPrice'
          onChange={formik.handleChange("adultPrice")}
          onBlur={formik.handleBlur("adultPrice")}
          value={formik.values.adultPrice.toString()}
          formikTouched={formik.touched.adultPrice}
          formikErrors={formik.errors.adultPrice}
        />
        <CustomInput
          type='number'
          label='Enter Event price for children'
          name='childPrice'
          onChange={formik.handleChange("childPrice")}
          onBlur={formik.handleBlur("childPrice")}
          value={formik.values.childPrice.toString()}
          formikTouched={formik.touched.childPrice}
          formikErrors={formik.errors.childPrice}
        />
        <CustomInput
          type='number'
          label='Enter quantity tickets for adults '
          name='adultQuantityTickets'
          onChange={formik.handleChange("adultQuantityTickets")}
          onBlur={formik.handleBlur("adultQuantityTickets")}
          value={formik.values.adultQuantityTickets.toString()}
          formikTouched={formik.touched.adultQuantityTickets}
          formikErrors={formik.errors.adultQuantityTickets}
        />
        <CustomInput
          type='number'
          label='Enter quantity tickets for children '
          name='childrenQuantityTickets'
          onChange={formik.handleChange("childrenQuantityTickets")}
          onBlur={formik.handleBlur("childrenQuantityTickets")}
          value={formik.values.childrenQuantityTickets.toString()}
          formikTouched={formik.touched.childrenQuantityTickets}
          formikErrors={formik.errors.childrenQuantityTickets}
        />
        <Select
          mode="multiple"
          label='Select Event time'
          optionItems={timePicker}
          defaultValue={selectedTime}
          onChange={(e: string[]) => handleTime(e)}
          valueSelect={formik.values.time?.[0]}
          className=' min-w-[100px] max-w-[450px] py-3 mb-3'
          formikErrors={formik.errors.time}
          formikTouched={formik.touched.time}
          name='time'
        />
        <>
          <div>Select date event</div>
          <Calendar locale={enUS.code} onChange={setValueCalendar} value={valueCalendar} />
          <pre>{JSON.stringify(formattedValueCalendar, null, 2)}</pre>
        </>
        <Button
          className="btn btn-success border-0 rounded-3 my-5"
          type="submit"
        >
          {eventId !== undefined ? "Edit" : "Add"} Event
        </Button>

      </form>
    </div>
  )
}
