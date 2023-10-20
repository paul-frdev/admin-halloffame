import React, { useState } from 'react'

import { Link, useLocation } from 'react-router-dom'
import * as yup from "yup";
import { useFormik } from "formik";
import { ImageUrls } from '../../types/store';
import { CustomInput } from '../ui/CustomInput';
import { UploadImages } from '../ui/UploadImages';
import { Button } from '../ui/Button';
import { Select } from '../ui/Select';
import { Map } from '../map/Map';

const schema = yup.object().shape({
  title: yup.string().required("Category Name is Required"),
});

interface FormikProps {
  title: string;
  descriptionText: string;
  Date?: Date;
  time: string[];
  image: ImageUrls[];
  location: string;
  adultPrice: number;
  childPrice: number;
  adultQuantityTickets: number;
  childrenQuantityTickets: number;
}

const timePicker = [{ id: 1, time: "10:00" }, { id: 1, time: "11:00" }, { id: 1, time: "12:00" }, { id: 1, time: "13:00" }, { id: 1, time: "14:00" }, { id: 1, time: "15:00" }, { id: 1, time: "16:00" }, { id: 1, time: "17:00" }, { id: 1, time: "18:00" }, { id: 1, time: "19:00" }, { id: 1, time: "20:00" }, { id: 1, time: "21:00" }]

export const EventForm = () => {

  const [selectedTime, setSelectedTime] = useState<string[]>([])

  const location = useLocation()

  const eventId = location.pathname.split("/")[3];

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
      childrenQuantityTickets: 0
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      console.log(values);

    },
  });

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
        <Map />
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
        <div>
          {/* Date picker */}
        </div>
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
